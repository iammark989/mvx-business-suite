<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PriceType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PriceTypeController extends Controller
{
    public function index(Request $request)
    {
        $priceTypes = PriceType::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->status === 'active', function ($query) {
                $query->where('is_active', true);
            })
            ->when($request->status === 'inactive', function ($query) {
                $query->where('is_active', false);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/price-types/index', [
            'priceTypes' => $priceTypes,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/price-types/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:20',
                'alpha_dash',
                'unique:price_types,code',
            ],
            'name' => [
                'required',
                'string',
                'max:100',
                'unique:price_types,name',
            ],
            'description' => ['nullable', 'string'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $validated['code'] = strtoupper($validated['code']);
        $validated['is_active'] = $validated['is_active'] ?? true;

        PriceType::create($validated);

        return redirect()
            ->route('price-types.index')
            ->with('success', 'Price type created successfully.');
    }

    public function edit(PriceType $priceType)
    {
        return Inertia::render('admin/price-types/edit', [
            'priceType' => $priceType,
        ]);
    }

    public function update(Request $request, PriceType $priceType)
    {
        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:20',
                'alpha_dash',
                'unique:price_types,code,' . $priceType->id,
            ],
            'name' => [
                'required',
                'string',
                'max:100',
                'unique:price_types,name,' . $priceType->id,
            ],
            'description' => ['nullable', 'string'],
        ]);

        $validated['code'] = strtoupper($validated['code']);

        $priceType->update($validated);

        return redirect()
            ->route('price-types.index')
            ->with('success', 'Price type updated successfully.');
    }

    public function updateStatus(Request $request, PriceType $priceType)
    {
        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $priceType->update([
            'is_active' => $validated['is_active'],
        ]);

        return redirect()
            ->route('price-types.index')
            ->with('success', 'Price type status updated successfully.');
    }
}