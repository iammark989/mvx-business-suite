<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Uom;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class UomController extends Controller
{
    /**
     * Display a listing of UOMs.
     */
    public function index(Request $request): Response
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', 'in:all,active,inactive'],
        ]);

        $search = $validated['search'] ?? '';
        $status = $validated['status'] ?? 'all';

        $uoms = Uom::query()
            ->select([
                'id',
                'code',
                'name',
                'measurement_type',
                'description',
                'is_active',
                'created_at',
            ])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%");
                });
            })
            ->when($status === 'active', function ($query) {
                $query->where('is_active', true);
            })
            ->when($status === 'inactive', function ($query) {
                $query->where('is_active', false);
            })
            ->orderBy('code')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/uoms/index', [
            'uoms' => $uoms,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a UOM.
     */
    public function create(): Response
    {
        Gate::authorize('uoms.create');

        return Inertia::render('admin/uoms/create');
    }

    /**
     * Store a newly created UOM.
     */
    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('uoms.create');

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:20',
                'alpha_dash:ascii',
                'uppercase',
                'unique:uoms,code',
            ],
            'name' => ['required', 'string', 'max:100'],
            'measurement_type' => [
                'required',
                Rule::in([
                    'quantity',
                    'weight',
                    'volume',
                    'length',
                    'area',
                ]),
            ],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        Uom::create([
            'code' => $validated['code'],
            'name' => $validated['name'],
            'measurement_type' => $validated['measurement_type'],
            'description' => $validated['description'] ?? null,
            'is_active' => true,
        ]);

        return redirect()
            ->route('uoms.index')
            ->with('success', 'Unit of measure created successfully.');
    }

    /**
     * Show the form for editing a UOM.
     */
    public function edit(Uom $uom): Response
    {
        Gate::authorize('uoms.update');

        return Inertia::render('admin/uoms/edit', [
            'uom' => [
                'id' => $uom->id,
                'code' => $uom->code,
                'name' => $uom->name,
                'measurement_type' => $uom->measurement_type,
                'description' => $uom->description,
                'is_active' => $uom->is_active,
            ],
        ]);
    }

    /**
     * Update the specified UOM.
     */
    public function update(Request $request, Uom $uom): RedirectResponse
    {
        Gate::authorize('uoms.update');

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:20',
                'alpha_dash:ascii',
                'uppercase',
                Rule::unique('uoms', 'code')->ignore($uom->id),
            ],
            'name' => ['required', 'string', 'max:100'],
            'measurement_type' => [
                'required',
                Rule::in([
                    'quantity',
                    'weight',
                    'volume',
                    'length',
                    'area',
                ]),
            ],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        if ($uom->measurement_type !== $validated['measurement_type']) {
            $isInUse = Item::query()
                ->where(function ($query) use ($uom) {
                    $query->where('purchase_uom_id', $uom->id)
                        ->orWhere('selling_uom_id', $uom->id)
                        ->orWhere('weight_uom_id', $uom->id);
                })
                ->exists();

            if ($isInUse) {
                throw ValidationException::withMessages([
                    'measurement_type' => 'The measurement type cannot be changed because this UOM is already assigned to one or more items.',
                ]);
            }
        }

        $uom->update([
            'code' => $validated['code'],
            'name' => $validated['name'],
            'measurement_type' => $validated['measurement_type'],
            'description' => $validated['description'] ?? null,
        ]);

        return redirect()
            ->route('uoms.index')
            ->with('success', 'Unit of measure updated successfully.');
    }

    /**
     * Activate or deactivate the specified UOM.
     */
    public function updateStatus(Request $request, Uom $uom): RedirectResponse
    {
        Gate::authorize('uoms.manage-status');

        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $uom->update([
            'is_active' => $validated['is_active'],
        ]);

        $message = $validated['is_active']
            ? 'Unit of measure activated successfully.'
            : 'Unit of measure deactivated successfully.';

        return redirect()
            ->route('uoms.index')
            ->with('success', $message);
    }
}