<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Category;
use App\Models\PriceType;
use App\Models\Uom;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ItemController extends Controller
{
        public function index(Request $request)
    {
        Gate::authorize('items.view');

        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        $search = $validated['search'] ?? null;
        $status = $validated['status'] ?? null;

        $items = Item::query()
            ->with([
                'category',
                'brand',
                'purchaseUom',
                'sellingUom',
            ])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('item_number', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('short_description', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query, $status) {
                $query->where(
                    'is_active',
                    $status === 'active'
                );
            })
            ->orderBy('item_number')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/items/index', [
            'items' => $items,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

        public function create()
    {
        Gate::authorize('items.create');

        return Inertia::render('admin/items/create', [
            'categories' => Category::query()
                ->where('is_active', true)
                ->orderBy('code')
                ->get(['id', 'code', 'name', 'parent_id']),

            'brands' => Brand::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'uoms' => Uom::query()
                ->where('is_active', true)
                ->orderBy('code')
                ->get(['id', 'code', 'name', 'measurement_type']),

            'priceTypes' => PriceType::query()
                ->where('is_active', true)
                ->orderBy('code')
                ->get(['id', 'code', 'name']),
        ]);
    }

        public function store(Request $request)
    {
        Gate::authorize('items.create');

        $validated = $request->validate([
            'item_number' => [
                'required',
                'string',
                'regex:/^[0-9]{7}$/',
                'unique:items,item_number',
            ],
            'description' => ['required', 'string', 'max:255'],
            'short_description' => ['nullable', 'string', 'max:100'],

            'category_id' => [
                'required',
                Rule::exists('categories', 'id')->where('is_active', true),
            ],
            'brand_id' => [
                'nullable',
                Rule::exists('brands', 'id')->where('is_active', true),
            ],

            'purchase_uom_id' => [
                'required',
                Rule::exists('uoms', 'id')->where('is_active', true),
            ],
            'selling_uom_id' => [
                'required',
                Rule::exists('uoms', 'id')->where('is_active', true),
            ],
            'purchase_qty' => [
                'required',
                'numeric',
                'gt:0',
            ],

            'selling_qty' => [
                'required',
                'numeric',
                'gt:0',
            ],

            'weight' => ['nullable', 'numeric', 'gt:0'],
            'weight_uom_id' => [
                'nullable',
                'required_with:weight',
                Rule::exists('uoms', 'id')
                    ->where('is_active', true)
                    ->where('measurement_type', 'weight'),
            ],

            'tax_classification' => [
                'required',
                Rule::in(['VAT', 'VAT-EX', 'ZERO', 'NON-VAT']),
            ],

            'prices' => ['nullable', 'array'],
            'prices.*.price_type_id' => [
                'required',
                'distinct',
                Rule::exists('price_types', 'id')->where('is_active', true),
            ],
            'prices.*.price' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        // Validate purchase and selling UOM compatibility.
        $uoms = DB::table('uoms')
            ->whereIn('id', [
                $validated['purchase_uom_id'],
                $validated['selling_uom_id'],
            ])
            ->get()
            ->keyBy('id');

        $purchaseUom = $uoms->get($validated['purchase_uom_id']);
        $sellingUom = $uoms->get($validated['selling_uom_id']);

        if ($purchaseUom->measurement_type !== $sellingUom->measurement_type) {
            throw ValidationException::withMessages([
                'selling_uom_id' => 'Purchase and selling UOMs must have the same measurement type.',
            ]);
        }

        // Same purchase and selling UOM must have equal quantities.
        if (
            (int) $validated['purchase_uom_id'] === (int) $validated['selling_uom_id']
            && round((float) $validated['purchase_qty'], 4) !==
                round((float) $validated['selling_qty'], 4)
        ) {
            throw ValidationException::withMessages([
                'selling_qty' => 'Purchase and selling quantities must be equal when both UOMs are the same.',
            ]);
        }

        // Weight and weight UOM must either both be provided or both be empty.
        if (
            ($validated['weight'] ?? null) !== null
            && empty($validated['weight_uom_id'])
        ) {
            throw ValidationException::withMessages([
                'weight_uom_id' => 'Please select a weight UOM.',
            ]);
        }

        if (!empty($validated['prices'])) {
            Gate::authorize('items.manage-prices');
        }

        DB::transaction(function () use ($validated) {
            $item = Item::create([
                'item_number' => $validated['item_number'],
                'description' => $validated['description'],
                'short_description' => $validated['short_description'] ?? null,
                'category_id' => $validated['category_id'],
                'brand_id' => $validated['brand_id'] ?? null,
                'purchase_uom_id' => $validated['purchase_uom_id'],
                'selling_uom_id' => $validated['selling_uom_id'],
                'purchase_qty' => $validated['purchase_qty'],
                'selling_qty' => $validated['selling_qty'],
                'weight' => $validated['weight'] ?? null,
                'weight_uom_id' => $validated['weight_uom_id'] ?? null,
                'tax_classification' => $validated['tax_classification'],
                'is_active' => true,
            ]);

            foreach ($validated['prices'] ?? [] as $price) {
                $item->prices()->create([
                    'price_type_id' => $price['price_type_id'],
                    'price' => $price['price'],
                ]);
            }
        });

        return redirect()
            ->route('items.index')
            ->with('success', 'Item created successfully.');
    }

        public function edit(Item $item)
    {
        Gate::authorize('items.update');

        $item->load([
            'category',
            'brand',
            'purchaseUom',
            'sellingUom',
            'weightUom',
            'prices.priceType',
        ]);

        return Inertia::render('admin/items/edit', [
            'item' => $item,

            'categories' => Category::query()
                ->where(function ($query) use ($item) {
                    $query->where('is_active', true)
                        ->orWhere('id', $item->category_id);
                })
                ->orderBy('code')
                ->get(['id', 'code', 'name', 'parent_id', 'is_active']),

            'brands' => Brand::query()
                ->where(function ($query) use ($item) {
                    $query->where('is_active', true);

                    if ($item->brand_id) {
                        $query->orWhere('id', $item->brand_id);
                    }
                })
                ->orderBy('name')
                ->get(['id', 'name', 'is_active']),

            'uoms' => Uom::query()
                ->where(function ($query) use ($item) {
                    $query->where('is_active', true)
                        ->orWhereIn('id', array_filter([
                            $item->purchase_uom_id,
                            $item->selling_uom_id,
                            $item->weight_uom_id,
                        ]));
                })
                ->orderBy('code')
                ->get(['id', 'code', 'name', 'measurement_type', 'is_active']),

            'priceTypes' => PriceType::query()
                ->where(function ($query) use ($item) {
                    $query->where('is_active', true)
                        ->orWhereIn(
                            'id',
                            $item->prices->pluck('price_type_id')
                        );
                })
                ->orderBy('code')
                ->get(['id', 'code', 'name', 'is_active']),
        ]);
    }

        public function update(Request $request, Item $item)
    {
        Gate::authorize('items.update');

        $validated = $request->validate([
            'item_number' => [
                'required',
                'string',
                'regex:/^[0-9]{7}$/',
                Rule::unique('items', 'item_number')->ignore($item->id),
            ],
            'description' => ['required', 'string', 'max:255'],
            'short_description' => ['nullable', 'string', 'max:100'],

            'category_id' => [
                'required',
                Rule::exists('categories', 'id')->where(function ($query) use ($item) {
                    $query->where('is_active', true)
                        ->orWhere('id', $item->category_id);
                }),
            ],

            'brand_id' => [
                'nullable',
                Rule::exists('brands', 'id')->where(function ($query) use ($item) {
                    $query->where('is_active', true)
                        ->orWhere('id', $item->brand_id);
                }),
            ],

            'purchase_uom_id' => [
                'required',
                Rule::exists('uoms', 'id')->where(function ($query) use ($item) {
                    $query->where('is_active', true)
                        ->orWhere('id', $item->purchase_uom_id);
                }),
            ],

            'selling_uom_id' => [
                'required',
                Rule::exists('uoms', 'id')->where(function ($query) use ($item) {
                    $query->where('is_active', true)
                        ->orWhere('id', $item->selling_uom_id);
                }),
            ],
            'purchase_qty' => [
                'required',
                'numeric',
                'gt:0',
            ],

            'selling_qty' => [
                'required',
                'numeric',
                'gt:0',
            ],

            'weight' => ['nullable', 'numeric', 'gt:0'],
            'weight_uom_id' => [
                'nullable',
                'required_with:weight',
                Rule::exists('uoms', 'id')->where(function ($query) use ($item) {
                    $query->where(function ($query) {
                        $query->where('is_active', true)
                            ->where('measurement_type', 'weight');
                    })->orWhere('id', $item->weight_uom_id);
                }),
            ],

            'tax_classification' => [
                'required',
                Rule::in(['VAT', 'VAT-EX', 'ZERO', 'NON-VAT']),
            ],

            'prices' => ['sometimes', 'array'],
            'prices.*.price_type_id' => [
                'required',
                'distinct',
                Rule::exists('price_types', 'id')->where(function ($query) use ($item) {
                    $query->where('is_active', true)
                        ->orWhereIn(
                            'id',
                            $item->prices()->select('price_type_id')
                        );
                }),
            ],
            'prices.*.price' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        // Validate purchase and selling UOM compatibility.
        $uoms = DB::table('uoms')
            ->whereIn('id', [
                $validated['purchase_uom_id'],
                $validated['selling_uom_id'],
            ])
            ->get()
            ->keyBy('id');

        $purchaseUom = $uoms->get($validated['purchase_uom_id']);
        $sellingUom = $uoms->get($validated['selling_uom_id']);

        if ($purchaseUom->measurement_type !== $sellingUom->measurement_type) {
            throw ValidationException::withMessages([
                'selling_uom_id' => 'Purchase and selling UOMs must have the same measurement type.',
            ]);
        }

        if (
            (int) $validated['purchase_uom_id'] === (int) $validated['selling_uom_id']
            && (float) $validated['purchase_conversion_qty'] !== 1.0
        ) {
            throw ValidationException::withMessages([
                'purchase_conversion_qty' => 'Conversion quantity must be 1 when purchase and selling UOM are the same.',
            ]);
        }

        // Validate weight and weight UOM pairing.
        $hasWeight = ($validated['weight'] ?? null) !== null;
        $hasWeightUom = !empty($validated['weight_uom_id']);

        if ($hasWeight !== $hasWeightUom) {
            throw ValidationException::withMessages([
                'weight_uom_id' => 'Weight and weight UOM must either both be provided or both be empty.',
            ]);
        }

        // Check whether submitted prices actually change existing prices.
        if (array_key_exists('prices', $validated)) {
            $existingPrices = $item->prices()
                ->get()
                ->keyBy('price_type_id');

            $pricesChanged = false;

            foreach ($validated['prices'] as $price) {
                $existingPrice = $existingPrices->get($price['price_type_id']);

                if (
                    !$existingPrice ||
                    number_format((float) $existingPrice->price, 4, '.', '') !==
                    number_format((float) $price['price'], 4, '.', '')
                ) {
                    $pricesChanged = true;
                    break;
                }
            }

            if ($pricesChanged) {
                Gate::authorize('items.manage-prices');
            }
        }

        DB::transaction(function () use ($validated, $item) {
            $item->update([
                'item_number' => $validated['item_number'],
                'description' => $validated['description'],
                'short_description' => $validated['short_description'] ?? null,
                'category_id' => $validated['category_id'],
                'brand_id' => $validated['brand_id'] ?? null,
                'purchase_uom_id' => $validated['purchase_uom_id'],
                'selling_uom_id' => $validated['selling_uom_id'],
                'purchase_qty' => $validated['purchase_qty'],
                'selling_qty' => $validated['selling_qty'],
                'weight' => $validated['weight'] ?? null,
                'weight_uom_id' => $validated['weight_uom_id'] ?? null,
                'tax_classification' => $validated['tax_classification'],
            ]);

            // Only synchronize submitted price entries.
            // Existing price records not submitted are preserved.
            if (array_key_exists('prices', $validated)) {
                foreach ($validated['prices'] as $price) {
                    $item->prices()->updateOrCreate(
                        [
                            'price_type_id' => $price['price_type_id'],
                        ],
                        [
                            'price' => $price['price'],
                        ]
                    );
                }
            }
        });

        return redirect()
            ->route('items.index')
            ->with('success', 'Item updated successfully.');
    }

        public function updateStatus(Item $item)
    {
        Gate::authorize('items.manage-status');

        $item->update([
            'is_active' => !$item->is_active,
        ]);

        return redirect()
            ->route('items.index')
            ->with(
                'success',
                $item->is_active
                    ? 'Item activated successfully.'
                    : 'Item deactivated successfully.'
            );
    }
}
