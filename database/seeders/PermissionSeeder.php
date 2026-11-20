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
            'users.update',
            'users.deactivate',
            'users.assign-roles',

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

            // Categories and Brands
            'categories.view',
            'categories.manage',
            'brands.view',
            'brands.manage',

            // Customers
            'customers.view',
            'customers.create',
            'customers.update',

            // Suppliers
            'suppliers.view',
            'suppliers.create',
            'suppliers.update',

            // Warehouses
            'warehouses.view',
            'warehouses.manage',

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
                'users.update',
                'users.deactivate',
                'users.assign-roles',

                'items.view',
                'items.create',
                'items.update',

                'categories.view',
                'categories.manage',
                'brands.view',
                'brands.manage',

                'customers.view',
                'customers.create',
                'customers.update',

                'suppliers.view',
                'suppliers.create',
                'suppliers.update',

                'warehouses.view',
                'warehouses.manage',

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

                'categories.view',
                'categories.manage',
                'brands.view',
                'brands.manage',

                'customers.view',
                'customers.create',
                'customers.update',

                'suppliers.view',
                'suppliers.create',
                'suppliers.update',

                'warehouses.view',
                'warehouses.manage',

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
            ],

            /*
            |--------------------------------------------------------------------------
            | Accounting
            |--------------------------------------------------------------------------
            */

            'Accounting' => [
                'dashboard.view',

                'items.view',
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
                'suppliers.view',
                'warehouses.view',

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

                'suppliers.view',
                'suppliers.create',
                'suppliers.update',

                'warehouses.view',

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