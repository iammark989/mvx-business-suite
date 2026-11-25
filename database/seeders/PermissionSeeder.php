<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        /*
        |--------------------------------------------------------------------------
        | Permission Definitions
        |--------------------------------------------------------------------------
        */

        $permissions = [
            // Dashboard
            'dashboard.view',

            // User Management
            'users.view',
            'users.create',
            'users.update-identity',
            'users.reset-password',
            'users.manage-status',
            'users.assign-roles',
            'users.update-profile',

            // Roles and Permissions
            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',
            'permissions.manage',

            // Items
            'items.view',
            'items.create',
            'items.update',

            // Units of Measure
            'uoms.view',
            'uoms.create',
            'uoms.update',
            'uoms.manage-status',

            // Categories
            'categories.view',
            'categories.create',
            'categories.update',
            'categories.manage-status',

            // Brands
            'brands.view',
            'brands.create',
            'brands.update',
            'brands.manage-status',

            // Customers
            'customers.view',
            'customers.create',
            'customers.update',

            // Suppliers
            'suppliers.view',
            'suppliers.create',
            'suppliers.update',
            'suppliers.manage-status',

            // Warehouses
            'warehouses.view',
            'warehouses.create',
            'warehouses.update',
            'warehouses.manage-status',
            'warehouses.assign-users',

            // Purchase Orders
            'purchase-orders.view',
            'purchase-orders.create',
            'purchase-orders.update',
            'purchase-orders.submit',

            // Goods Receipts
            'goods-receipts.view',
            'goods-receipts.create',
            'goods-receipts.finalize',

            // Inventory
            'inventory.view',
            'inventory.adjust',
            'inventory.transfer',

            // Sales Orders
            'sales-orders.view',
            'sales-orders.create',
            'sales-orders.update',
            'sales-orders.finalize',

            // Accounting
            'accounting.view',
            'accounting.manage',

            // Reports
            'reports.view',
            'reports.export',

            // System Settings
            'settings.view',
            'settings.update',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Role Permission Assignments
        |--------------------------------------------------------------------------
        */

        $rolePermissions = [

            /*
            |--------------------------------------------------------------------------
            | System Administrator
            |--------------------------------------------------------------------------
            | Unrestricted access will be implemented through Laravel Gate.
            | Individual permissions are not required for this role.
            */

            'System Administrator' => [],

            /*
            |--------------------------------------------------------------------------
            | Administrator
            |--------------------------------------------------------------------------
            | User and system administration, plus broad ERP access.
            | Cannot manage roles or permission definitions.
            */

            'Administrator' => [
                'dashboard.view',

                'users.view',
                'users.create',
                'users.reset-password',
                'users.manage-status',
                'users.assign-roles',
                'users.update-profile',

                'items.view',
                'items.create',
                'items.update',

                'uoms.view',
                'uoms.create',
                'uoms.update',
                'uoms.manage-status',

                'categories.view',
                'categories.create',
                'categories.update',
                'categories.manage-status',

                'brands.view',
                'brands.create',
                'brands.update',
                'brands.manage-status',

                'customers.view',
                'customers.create',
                'customers.update',

                'suppliers.view',
                'suppliers.create',
                'suppliers.update',
                'suppliers.manage-status',

                'warehouses.view',
                'warehouses.create',
                'warehouses.update',
                'warehouses.manage-status',
                'warehouses.assign-users',

                'purchase-orders.view',
                'purchase-orders.create',
                'purchase-orders.update',
                'purchase-orders.submit',

                'goods-receipts.view',
                'goods-receipts.create',
                'goods-receipts.finalize',

                'inventory.view',
                'inventory.adjust',
                'inventory.transfer',

                'sales-orders.view',
                'sales-orders.create',
                'sales-orders.update',
                'sales-orders.finalize',

                'accounting.view',
                'accounting.manage',

                'reports.view',
                'reports.export',

                'settings.view',
            ],

            /*
            |--------------------------------------------------------------------------
            | Manager
            |--------------------------------------------------------------------------
            | Broad operational management.
            */

            'Manager' => [
                'dashboard.view',

                'items.view',
                'items.create',
                'items.update',

                'uoms.view',
                'uoms.create',
                'uoms.update',
                'uoms.manage-status',
                'users.update-profile',

                'categories.view',
                'categories.create',
                'categories.update',
                'categories.manage-status',

                'brands.view',
                'brands.create',
                'brands.update',
                'brands.manage-status',

                'customers.view',
                'customers.create',
                'customers.update',

                'suppliers.view',
                'suppliers.create',
                'suppliers.update',
                'suppliers.manage-status',

                'warehouses.view',
                'warehouses.create',
                'warehouses.update',
                'warehouses.manage-status',
                'warehouses.assign-users',

                'purchase-orders.view',
                'purchase-orders.create',
                'purchase-orders.update',
                'purchase-orders.submit',

                'goods-receipts.view',
                'goods-receipts.create',
                'goods-receipts.finalize',

                'inventory.view',
                'inventory.adjust',
                'inventory.transfer',

                'sales-orders.view',
                'sales-orders.create',
                'sales-orders.update',
                'sales-orders.finalize',

                'accounting.view',

                'reports.view',
                'reports.export',

                'users.view',
                'users.create',
                'users.reset-password',
                'users.manage-status',
                'users.assign-roles',
            ],

            /*
            |--------------------------------------------------------------------------
            | Accounting
            |--------------------------------------------------------------------------
            */

            'Accounting' => [
                'dashboard.view',

                'items.view',
                'uoms.view',
                'categories.view',
                'brands.view',
                'customers.view',
                'suppliers.view',
                'warehouses.view',

                'purchase-orders.view',
                'goods-receipts.view',
                'inventory.view',
                'sales-orders.view',

                'accounting.view',
                'accounting.manage',

                'reports.view',
                'reports.export',
            ],

            /*
            |--------------------------------------------------------------------------
            | Sales
            |--------------------------------------------------------------------------
            */

            'Sales' => [
                'dashboard.view',

                'items.view',
                'uoms.view',
                'categories.view',
                'suppliers.view',
                'brands.view',
                'customers.view',
                'customers.create',
                'customers.update',

                'warehouses.view',
                'inventory.view',

                'sales-orders.view',
                'sales-orders.create',
                'sales-orders.update',
                'sales-orders.finalize',

                'reports.view',
            ],

            /*
            |--------------------------------------------------------------------------
            | Warehouseman
            |--------------------------------------------------------------------------
            */

            'Warehouseman' => [
                'dashboard.view',

                'items.view',
                'uoms.view',
                'categories.view',
                'suppliers.view',
                'warehouses.view',
                'brands.view',

                'goods-receipts.view',
                'goods-receipts.create',
                'goods-receipts.finalize',

                'inventory.view',
                'inventory.adjust',
                'inventory.transfer',

                'reports.view',
            ],

            /*
            |--------------------------------------------------------------------------
            | Purchaser
            |--------------------------------------------------------------------------
            */

            'Purchaser' => [
                'dashboard.view',

                'items.view',
                'uoms.view',
                'categories.view',
                'suppliers.view',
                'suppliers.create',
                'suppliers.update',
                'suppliers.manage-status',

                'warehouses.view',

                'brands.view',
                'brands.create',
                'brands.update',
                'brands.manage-status',

                'purchase-orders.view',
                'purchase-orders.create',
                'purchase-orders.update',
                'purchase-orders.submit',

                'goods-receipts.view',
                'inventory.view',

                'reports.view',
            ],
        ];

        foreach ($rolePermissions as $roleName => $permissionsForRole) {
            $role = Role::findByName($roleName, 'web');

            $role->syncPermissions($permissionsForRole);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}