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
use Illuminate\Support\Facades\Password as PasswordBroker;

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
        Gate::authorize('users.update-profile');

        abort_if($user->hasRole('System Administrator'), 403);

        $canUpdateIdentity = $request->user()->can('users.update-identity');

        $roles = Role::query()
            ->where('guard_name', 'web')
            ->where('name', '!=', 'System Administrator')
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('admin/users/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'position' => $user->position,
                'email' => $user->email,
                'is_active' => $user->is_active,
                'role' => $user->roles->first()?->name ?? '',
            ],
            'canUpdateIdentity' => $canUpdateIdentity,
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
     * Update the identity and role of the specified user.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        Gate::authorize('users.update-profile');

        abort_if($user->hasRole('System Administrator'), 403);

        $canUpdateIdentity = $request->user()->can('users.update-identity');

        $assignableRoles = Role::query()
            ->where('guard_name', 'web')
            ->where('name', '!=', 'System Administrator')
            ->pluck('name')
            ->all();

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:100'],
            'role' => ['required', 'string', Rule::in($assignableRoles)],
        ];

        if ($canUpdateIdentity) {
            $rules['email'] = [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ];
        }

        $validated = $request->validate($rules);

        $user->name = $validated['name'];
        $user->position = $validated['position'] ?? null;

        if ($canUpdateIdentity && $user->email !== $validated['email']) {
            $user->email = $validated['email'];
            $user->email_verified_at = null;
        }

        $user->save();

        $user->syncRoles([$validated['role']]);

        return redirect()
            ->route('users.index')
            ->with('success', 'User account updated successfully.');
    }

    /**
     * Send a password reset link to the specified user's email.
     */
    public function resetPassword(Request $request, User $user): RedirectResponse
    {
        Gate::authorize('users.reset-password');

        // Protect the System Administrator account.
        abort_if($user->hasRole('System Administrator'), 403);

        // Managers cannot send reset links to Administrator accounts.
        abort_if(
            $user->hasRole('Administrator') &&
            ! $request->user()->hasRole('System Administrator'),
            403
        );

        // Send the password reset link.
        $status = PasswordBroker::sendResetLink([
            'email' => $user->email,
        ]);

        if ($status === PasswordBroker::RESET_LINK_SENT) {
            return redirect()
                ->route('users.index')
                ->with('success', 'Password reset link sent to the user email address.');
        }

        return redirect()
            ->route('users.index')
            ->withErrors([
                'email' => __($status),
            ]);
    }

    /**
     * Activate or deactivate the specified user account.
     */
    public function updateStatus(Request $request, User $user): RedirectResponse
    {
        Gate::authorize('users.manage-status');

        // Protect the System Administrator account.
        abort_if($user->hasRole('System Administrator'), 403);

        // Prevent users from deactivating their own accounts.
        abort_if($request->user()->id === $user->id, 403);

        // Managers cannot manage Administrator accounts.
        abort_if(
            $user->hasRole('Administrator') &&
            ! $request->user()->hasRole('System Administrator'),
            403
        );

        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $user->update([
            'is_active' => $validated['is_active'],
        ]);

        $message = $validated['is_active']
            ? 'User account activated successfully.'
            : 'User account deactivated successfully.';

        return redirect()
            ->route('users.index')
            ->with('success', $message);
    }


}