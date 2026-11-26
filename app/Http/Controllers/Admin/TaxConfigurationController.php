<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TaxConfiguration;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TaxConfigurationController extends Controller
{
    private const CLASSIFICATIONS = [
        'VAT' => 'VATable',
        'VAT-EX' => 'VAT-Exempt',
        'ZERO' => 'Zero-Rated',
        'NON-VAT' => 'Not Subject to VAT',
    ];

    public function index(Request $request)
    {
        $taxConfigurations = TaxConfiguration::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->classification, function ($query, $classification) {
                $query->where('classification', $classification);
            })
            ->when($request->status === 'active', function ($query) {
                $query->where('is_active', true);
            })
            ->when($request->status === 'inactive', function ($query) {
                $query->where('is_active', false);
            })
            ->orderByDesc('effective_from')
            ->orderBy('classification')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/tax-configurations/index', [
            'taxConfigurations' => $taxConfigurations,
            'filters' => $request->only([
                'search',
                'classification',
                'status',
            ]),
            'classifications' => self::CLASSIFICATIONS,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/tax-configurations/create', [
            'classifications' => self::CLASSIFICATIONS,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'classification' => [
                'required',
                Rule::in(array_keys(self::CLASSIFICATIONS)),
            ],
            'name' => [
                'required',
                'string',
                'max:100',
            ],
            'rate' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'effective_from' => [
                'required',
                'date',
            ],
            'effective_until' => [
                'nullable',
                'date',
                'after_or_equal:effective_from',
            ],
            'is_active' => [
                'sometimes',
                'boolean',
            ],
        ]);

        $classification = $validated['classification'];

        $effectiveFrom = $validated['effective_from'];
        $effectiveUntil = $validated['effective_until'] ?? null;

        $hasOverlap = TaxConfiguration::query()
            ->where('classification', $classification)
            ->whereDate('effective_from', '<=', $effectiveUntil ?? '9999-12-31')
            ->where(function ($query) use ($effectiveFrom) {
                $query->whereNull('effective_until')
                    ->orWhereDate('effective_until', '>=', $effectiveFrom);
            })
            ->exists();

        if ($hasOverlap) {
            return back()
                ->withErrors([
                    'effective_from' => 'The effective dates overlap with an existing configuration for this classification.',
                ])
                ->withInput();
        }

        TaxConfiguration::create([
            'code' => $classification,
            'name' => $validated['name'],
            'classification' => $classification,
            'rate' => $validated['rate'],
            'description' => $validated['description'] ?? null,
            'effective_from' => $effectiveFrom,
            'effective_until' => $effectiveUntil,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()
            ->route('tax-configurations.index')
            ->with('success', 'Tax configuration created successfully.');
    }

    
    public function edit(TaxConfiguration $taxConfiguration)
    {
        return Inertia::render('admin/tax-configurations/edit', [
            'taxConfiguration' => $taxConfiguration,
            'classifications' => self::CLASSIFICATIONS,
        ]);
    }


    public function update(Request $request, TaxConfiguration $taxConfiguration)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:100',
            ],
            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $taxConfiguration->update($validated);

        return redirect()
            ->route('tax-configurations.index')
            ->with('success', 'Tax configuration details updated successfully.');
    }


    public function updateStatus(Request $request, TaxConfiguration $taxConfiguration)
    {
        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $taxConfiguration->update([
            'is_active' => $validated['is_active'],
        ]);

        return redirect()
            ->route('tax-configurations.index')
            ->with('success', 'Tax configuration status updated successfully.');
    }


}