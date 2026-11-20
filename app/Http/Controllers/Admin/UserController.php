<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request): Response
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', 'in:all,active,inactive'],
        ]);

        $search = $validated['search'] ?? '';
        $status = $validated['status'] ?? 'all';

        $users = User::query()
            ->select([
                'id',
                'name',
                'email',
                'is_active',
                'created_at',
            ])
            ->with('roles:id,name')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($status === 'active', function ($query) {
                $query->where('is_active', true);
            })
            ->when($status === 'inactive', function ($query) {
                $query->where('is_active', false);
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(Request $request): Response
    {
        Gate::authorize('users.assign-roles');

        $isSystemAdministrator = $request->user()
            ->hasRole('System Administrator');

       $roles = Role::query()
            ->where('guard_name', 'web')
            ->where('name', '!=', 'System Administrator')
            ->orderBy('name')
            ->get(['id', 'name']);
        return Inertia::render('admin/users/create', [
            'roles' => $roles,
        ]);
    }


    /**
     * Show the form for editing a user.
     */
    public function edit(Request $request, User $user): Response
    {
        abort_if(
            $user->hasRole('System Administrator') &&
            ! $request->user()->hasRole('System Administrator'),
            403
        );

        $roles = Role::query()
            ->where('guard_name', 'web')
            ->where('name', '!=', 'System Administrator')
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('admin/users/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => $user->is_active,
                'role' => $user->roles->first()?->name ?? '',
            ],
            'roles' => $roles,
        ]);
    }


    /**
     * Store a newly created user.
     */
    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('users.assign-roles');

        $isSystemAdministrator = $request->user()
            ->hasRole('System Administrator');

        $assignableRoles = Role::query()
            ->where('guard_name', 'web')
            ->when(
                ! $isSystemAdministrator,
                fn ($query) => $query->where('name', '!=', 'System Administrator')
            )
            ->pluck('name')
            ->all();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'confirmed',
                Password::defaults(),
            ],
            'is_active' => ['required', 'boolean'],
            'role' => [
                'required',
                'string',
                Rule::in($assignableRoles),
            ],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'is_active' => $validated['is_active'],
        ]);

        $user->syncRoles([$validated['role']]);

        return redirect()
            ->route('users.index')
            ->with('success', 'User account created successfully.');
    }


    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        // Protect the reserved System Administrator account.
        abort_if($user->hasRole('System Administrator'), 403);

        // Role assignment requires its own permission.
        Gate::authorize('users.assign-roles');

        $assignableRoles = Role::query()
            ->where('guard_name', 'web')
            ->where('name', '!=', 'System Administrator')
            ->pluck('name')
            ->all();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'role' => [
                'required',
                'string',
                Rule::in($assignableRoles),
            ],
            'is_active' => ['required', 'boolean'],
        ]);

        // Reset email verification if the email address changes.
        if ($user->email !== $validated['email']) {
            $user->email_verified_at = null;
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->is_active = $validated['is_active'];
        $user->save();

        // Ensure the user has exactly one assigned role.
        $user->syncRoles([$validated['role']]);

        return redirect()
            ->route('users.index')
            ->with('success', 'User account updated successfully.');
    }

}