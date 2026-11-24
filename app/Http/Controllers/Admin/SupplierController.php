<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display the supplier listing.
     */
    public function index(Request $request)
    {
        Gate::authorize('suppliers.view');

        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', Rule::in(['active', 'inactive', 'all'])],
        ]);

        $search = $validated['search'] ?? '';
        $status = $validated['status'] ?? 'all';

        $suppliers = Supplier::query()
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhere('contact_person', 'like', "%{$search}%")
                        ->orWhere('contact_number', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($status !== 'all', function ($query) use ($status) {
                $query->where(
                    'is_active',
                    $status === 'active'
                );
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/suppliers/index', [
            'suppliers' => $suppliers,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the supplier creation form.
     */
    public function create()
    {
        Gate::authorize('suppliers.create');

        return Inertia::render('admin/suppliers/create');
    }

    /**
     * Store a newly created supplier.
     */
    public function store(Request $request)
    {
        Gate::authorize('suppliers.create');

        $request->merge([
            'code' => strtoupper(trim($request->input('code', ''))),
        ]);

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'min:6',
                'max:7',
                'regex:/^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]+$/',
                'unique:suppliers,code',
            ],
            'name' => [
                'required',
                'string',
                'max:100',
                'unique:suppliers,name',
            ],
            'contact_person' => ['nullable', 'string', 'max:100'],
            'contact_number' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:150'],
            'tin_number' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string', 'max:5000'],
            'remarks' => ['nullable', 'string', 'max:5000'],
        ], [
            'code.regex' => 'Supplier code must contain 6–7 letters and numbers, with at least one letter and one number.',
        ]);

        $validated['is_active'] = true;

        Supplier::create($validated);

        return redirect()
            ->route('suppliers.index')
            ->with('success', 'Supplier created successfully.');
    }

    /**
     * Show the supplier edit form.
     */
    public function edit(Supplier $supplier)
    {
        Gate::authorize('suppliers.update');

        return Inertia::render('admin/suppliers/edit', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Update the specified supplier.
     */
    public function update(Request $request, Supplier $supplier)
    {
        Gate::authorize('suppliers.update');

        $request->merge([
            'code' => strtoupper(trim($request->input('code', ''))),
        ]);

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'min:6',
                'max:7',
                'regex:/^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]+$/',
                Rule::unique('suppliers', 'code')->ignore($supplier->id),
            ],
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('suppliers', 'name')->ignore($supplier->id),
            ],
            'contact_person' => ['nullable', 'string', 'max:100'],
            'contact_number' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:150'],
            'tin_number' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string', 'max:5000'],
            'remarks' => ['nullable', 'string', 'max:5000'],
        ], [
            'code.regex' => 'Supplier code must contain 6–7 letters and numbers, with at least one letter and one number.',
        ]);

        $supplier->update($validated);

        return redirect()
            ->route('suppliers.index')
            ->with('success', 'Supplier updated successfully.');
    }

    /**
     * Activate or deactivate the specified supplier.
     */
    public function updateStatus(Request $request, Supplier $supplier)
    {
        Gate::authorize('suppliers.manage-status');

        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $supplier->update([
            'is_active' => $validated['is_active'],
        ]);

        $message = $validated['is_active']
            ? 'Supplier activated successfully.'
            : 'Supplier deactivated successfully.';

        return redirect()
            ->back()
            ->with('success', $message);
    }
}