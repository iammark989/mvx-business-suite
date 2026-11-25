<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    private const TYPES = [
        'Main Warehouse',
        'Branch Warehouse',
        'Retail Store',
        'Cold Storage',
        'Distribution Center',
        'Other',
    ];

    /**
     * Display the warehouse listing.
     */
    public function index(Request $request)
    {
        Gate::authorize('warehouses.view');

        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', Rule::in(['active', 'inactive', 'all'])],
        ]);

        $search = $validated['search'] ?? '';
        $status = $validated['status'] ?? 'all';

        $query = Warehouse::query()
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhere('type', 'like', "%{$search}%")
                        ->orWhere('contact_person', 'like', "%{$search}%");
                });
            })
            ->when($status !== 'all', function ($query) use ($status) {
                $query->where('is_active', $status === 'active');
            });

        // Warehousemen can only see their assigned warehouses.
        if ($request->user()->hasRole('Warehouseman')) {
            $query->whereHas('users', function ($query) use ($request) {
                $query->where('users.id', $request->user()->id);
            });
        }

        $warehouses = $query
            ->withCount('users')
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/warehouses/index', [
            'warehouses' => $warehouses,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the warehouse creation form.
     */
    public function create()
    {
        Gate::authorize('warehouses.create');

        return Inertia::render('admin/warehouses/create', [
            'warehouseTypes' => self::TYPES,
        ]);
    }

    /**
     * Store a newly created warehouse.
     */
    public function store(Request $request)
    {
        Gate::authorize('warehouses.create');

        $request->merge([
            'code' => strtoupper(trim($request->input('code', ''))),
        ]);

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:20',
                'regex:/^[A-Z0-9]+$/',
                'unique:warehouses,code',
            ],
            'name' => ['required', 'string', 'max:100'],
            'type' => ['required', Rule::in(self::TYPES)],
            'description' => ['nullable', 'string', 'max:5000'],
            'contact_person' => ['nullable', 'string', 'max:100'],
            'contact_number' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:150'],
            'address' => ['nullable', 'string', 'max:5000'],
        ]);

        $validated['is_active'] = true;

        Warehouse::create($validated);

        return redirect()
            ->route('warehouses.index')
            ->with('success', 'Warehouse created successfully.');
    }

    /**
     * Show the warehouse edit form.
     */
    public function edit(Warehouse $warehouse)
    {
        Gate::authorize('warehouses.update');

        return Inertia::render('admin/warehouses/edit', [
            'warehouse' => $warehouse,
            'warehouseTypes' => self::TYPES,
        ]);
    }

    /**
     * Update the specified warehouse.
     */
    public function update(Request $request, Warehouse $warehouse)
    {
        Gate::authorize('warehouses.update');

        $request->merge([
            'code' => strtoupper(trim($request->input('code', ''))),
        ]);

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:20',
                'regex:/^[A-Z0-9]+$/',
                Rule::unique('warehouses', 'code')->ignore($warehouse->id),
            ],
            'name' => ['required', 'string', 'max:100'],
            'type' => ['required', Rule::in(self::TYPES)],
            'description' => ['nullable', 'string', 'max:5000'],
            'contact_person' => ['nullable', 'string', 'max:100'],
            'contact_number' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:150'],
            'address' => ['nullable', 'string', 'max:5000'],
        ]);

        $warehouse->update($validated);

        return redirect()
            ->route('warehouses.index')
            ->with('success', 'Warehouse updated successfully.');
    }

    /**
     * Activate or deactivate the specified warehouse.
     */
    public function updateStatus(Request $request, Warehouse $warehouse)
    {
        Gate::authorize('warehouses.manage-status');

        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $warehouse->update([
            'is_active' => $validated['is_active'],
        ]);

        $message = $validated['is_active']
            ? 'Warehouse activated successfully.'
            : 'Warehouse deactivated successfully.';

        return redirect()
            ->back()
            ->with('success', $message);
    }

    /**
     * Edit Assign users.
     */
    public function editUsers(Warehouse $warehouse)
    {
        Gate::authorize('warehouses.assign-users');

        $warehousemen = User::role('Warehouseman')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'email']);

        $assignedUserIds = $warehouse->users()
            ->pluck('users.id')
            ->map(fn ($id) => (int) $id)
            ->values();

        return Inertia::render('admin/warehouses/users', [
            'warehouse' => $warehouse,
            'warehousemen' => $warehousemen,
            'assignedUserIds' => $assignedUserIds,
        ]);
    }

    /**
     * Assign Warehouseman users to the specified warehouse.
     */
    public function assignUsers(Request $request, Warehouse $warehouse)
    {
        Gate::authorize('warehouses.assign-users');

        $validated = $request->validate([
            'user_ids' => ['present', 'array'],
            'user_ids.*' => ['required', 'integer', 'distinct', 'exists:users,id'],
        ]);

        $userIds = collect($validated['user_ids']);

        $warehousemen = User::query()
            ->whereIn('id', $userIds)
            ->where('is_active', true)
            ->role('Warehouseman')
            ->pluck('id');

        if ($warehousemen->count() !== $userIds->count()) {
            return back()->withErrors([
                'user_ids' => 'Only active Warehouseman accounts can be assigned to a warehouse.',
            ]);
        }

        $warehouse->users()->sync($warehousemen);

        return back()->with(
            'success',
            'Warehouse assignments updated successfully.'
        );
    }
}