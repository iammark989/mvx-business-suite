<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Gate;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'email_verified_at' => $request->user()->email_verified_at,
                    'profile_photo_url' => $request->user()->profile_photo_path
                        ? \Illuminate\Support\Facades\Storage::disk('public')
                            ->url($request->user()->profile_photo_path)
                        : null,
                ] : null,
                'permissions' => $request->user()
                    ? collect([
                        'dashboard.view',

                        // Unit of Measure
                        'uoms.view',
                        'uoms.create',
                        'uoms.update',
                        'uoms.manage-status',

                        // Categories
                        'categories.view',
                        'categories.create',
                        'categories.update',
                        'categories.manage-status',

                        // Suppliers
                        'suppliers.view',
                        'suppliers.create',
                        'suppliers.update',
                        'suppliers.manage-status',

                        // Brands
                        'brands.view',
                        'brands.create',
                        'brands.update',
                        'brands.manage-status',

                        // Price
                        'price-types.view',
                        'price-types.create',
                        'price-types.update',
                        'price-types.manage-status',

                        // Tax Configuration
                        'tax-configurations.view',
                        'tax-configurations.create',
                        'tax-configurations.update',
                        'tax-configurations.manage-status',

                        'purchase-orders.view',
                        'goods-receipts.view',
                        'inventory.view',

                        // Items
                        'items.view',
                        'items.create',
                        'items.update',
                        'items.manage-prices',
                        'items.manage-status',
                        
                        // User Management
                        'users.view',
                        'users.create',
                        'users.update-profile',
                        'users.update-identity',
                        'users.reset-password',
                        'users.manage-status',
                        'users.assign-roles',

                        // Roles
                        'roles.view',
                        'settings.view',

                        // Warehouses
                        'warehouses.view',
                        'warehouses.create',
                        'warehouses.update',
                        'warehouses.manage-status',
                        'warehouses.assign-users',
                    ])->filter(fn ($permission) => Gate::forUser($request->user())->allows($permission))
                        ->values()
                        ->all()
                    : [],
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
