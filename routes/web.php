<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PriceTypeController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\TaxConfigurationController;
use App\Http\Controllers\Admin\UomController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WarehouseController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

 Route::get('/', function () {
                return Inertia::render('home');
            })->name('home');

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('dashboard');
        })
            ->middleware('can:dashboard.view')
            ->name('dashboard');

           

        Route::prefix('settings')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])
                ->name('profile.edit');

            Route::post('/profile', [ProfileController::class, 'update'])
                ->name('profile.update');

            Route::get('/security', [SecurityController::class, 'edit'])
                ->name('security.edit');

            Route::put('/security', [SecurityController::class, 'update'])
                ->name('security.update');

            Route::get('/appearance', function () {
                    return Inertia::render('settings/appearance');
                })->name('appearance.edit');
            });

            // Admin users
            Route::get('/users', [UserController::class, 'index'])
                ->middleware('can:users.view')
                ->name('users.index');

            Route::get('/users/create', [UserController::class, 'create'])
                ->middleware('can:users.create')
                ->name('users.create');

            Route::post('/users', [UserController::class, 'store'])
                ->middleware('can:users.create')
                ->name('users.store');

            Route::get('/users/{user}/edit', [UserController::class, 'edit'])
                ->middleware('can:users.update-profile')
                ->name('users.edit');

            Route::put('/users/{user}', [UserController::class, 'update'])
                ->middleware('can:users.update-profile')
                ->name('users.update');
            
            Route::put('/users/{user}/password', [UserController::class, 'resetPassword'])
                ->middleware('can:users.reset-password')
                ->name('users.reset-password');
                
            Route::patch('/users/{user}/status', [UserController::class, 'updateStatus'])
                ->middleware('can:users.manage-status')
                ->name('users.update-status');
                
            // Unit of Measure Management
            Route::get('/uoms', [UomController::class, 'index'])
                ->middleware('can:uoms.view')
                ->name('uoms.index');

            Route::get('/uoms/create', [UomController::class, 'create'])
                ->middleware('can:uoms.create')
                ->name('uoms.create');

            Route::post('/uoms', [UomController::class, 'store'])
                ->middleware('can:uoms.create')
                ->name('uoms.store');

            Route::get('/uoms/{uom}/edit', [UomController::class, 'edit'])
                ->middleware('can:uoms.update')
                ->name('uoms.edit');

            Route::put('/uoms/{uom}', [UomController::class, 'update'])
                ->middleware('can:uoms.update')
                ->name('uoms.update');

            Route::patch('/uoms/{uom}/status', [UomController::class, 'updateStatus'])
                ->middleware('can:uoms.manage-status')
                ->name('uoms.update-status');
                
              // Category Management
            Route::get('/categories', [CategoryController::class, 'index'])
                ->middleware('can:categories.view')
                ->name('categories.index');

            Route::get('/categories/create', [CategoryController::class, 'create'])
                ->middleware('can:categories.create')
                ->name('categories.create');

            Route::post('/categories', [CategoryController::class, 'store'])
                ->middleware('can:categories.create')
                ->name('categories.store');

            Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])
                ->middleware('can:categories.update')
                ->name('categories.edit');

            Route::put('/categories/{category}', [CategoryController::class, 'update'])
                ->middleware('can:categories.update')
                ->name('categories.update');

            Route::patch('/categories/{category}/status', [CategoryController::class, 'updateStatus'])
                ->middleware('can:categories.manage-status')
                ->name('categories.update-status');   
                
            // Supplier Management
            Route::get('/suppliers', [SupplierController::class, 'index'])
                ->middleware('can:suppliers.view')
                ->name('suppliers.index');

            Route::get('/suppliers/create', [SupplierController::class, 'create'])
                ->middleware('can:suppliers.create')
                ->name('suppliers.create');

            Route::post('/suppliers', [SupplierController::class, 'store'])
                ->middleware('can:suppliers.create')
                ->name('suppliers.store');

            Route::get('/suppliers/{supplier}/edit', [SupplierController::class, 'edit'])
                ->middleware('can:suppliers.update')
                ->name('suppliers.edit');

            Route::put('/suppliers/{supplier}', [SupplierController::class, 'update'])
                ->middleware('can:suppliers.update')
                ->name('suppliers.update');

            Route::patch('/suppliers/{supplier}/status', [SupplierController::class, 'updateStatus'])
                ->middleware('can:suppliers.manage-status')
                ->name('suppliers.update-status');    

            // Warehouse Management
            Route::get('/warehouses', [WarehouseController::class, 'index'])
                ->middleware('can:warehouses.view')
                ->name('warehouses.index');

            Route::get('/warehouses/create', [WarehouseController::class, 'create'])
                ->middleware('can:warehouses.create')
                ->name('warehouses.create');

            Route::post('/warehouses', [WarehouseController::class, 'store'])
                ->middleware('can:warehouses.create')
                ->name('warehouses.store');

            Route::get('/warehouses/{warehouse}/edit', [WarehouseController::class, 'edit'])
                ->middleware('can:warehouses.update')
                ->name('warehouses.edit');

            Route::put('/warehouses/{warehouse}', [WarehouseController::class, 'update'])
                ->middleware('can:warehouses.update')
                ->name('warehouses.update');

            Route::patch('/warehouses/{warehouse}/status', [WarehouseController::class, 'updateStatus'])
                ->middleware('can:warehouses.manage-status')
                ->name('warehouses.update-status');

            Route::put('/warehouses/{warehouse}/users', [WarehouseController::class, 'assignUsers'])
                ->middleware('can:warehouses.assign-users')
                ->name('warehouses.assign-users');
                
            Route::get('/warehouses/{warehouse}/users', [WarehouseController::class, 'editUsers'])
                ->middleware('can:warehouses.assign-users')
                ->name('warehouses.users');
                
                        // Brand Management
            Route::get('/brands', [BrandController::class, 'index'])
                ->middleware('can:brands.view')
                ->name('brands.index');

            Route::get('/brands/create', [BrandController::class, 'create'])
                ->middleware('can:brands.create')
                ->name('brands.create');

            Route::post('/brands', [BrandController::class, 'store'])
                ->middleware('can:brands.create')
                ->name('brands.store');

            Route::get('/brands/{brand}/edit', [BrandController::class, 'edit'])
                ->middleware('can:brands.update')
                ->name('brands.edit');

            Route::put('/brands/{brand}', [BrandController::class, 'update'])
                ->middleware('can:brands.update')
                ->name('brands.update');

            Route::patch('/brands/{brand}/status', [BrandController::class, 'updateStatus'])
                ->middleware('can:brands.manage-status')
                ->name('brands.update-status'); 
                
            // Price Type Management
            Route::get('/price-types', [PriceTypeController::class, 'index'])
                ->middleware('can:price-types.view')
                ->name('price-types.index');

            Route::get('/price-types/create', [PriceTypeController::class, 'create'])
                ->middleware('can:price-types.create')
                ->name('price-types.create');

            Route::post('/price-types', [PriceTypeController::class, 'store'])
                ->middleware('can:price-types.create')
                ->name('price-types.store');

            Route::get('/price-types/{priceType}/edit', [PriceTypeController::class, 'edit'])
                ->middleware('can:price-types.update')
                ->name('price-types.edit');

            Route::put('/price-types/{priceType}', [PriceTypeController::class, 'update'])
                ->middleware('can:price-types.update')
                ->name('price-types.update');

            Route::patch('/price-types/{priceType}/status', [PriceTypeController::class, 'updateStatus'])
                ->middleware('can:price-types.manage-status')
                ->name('price-types.update-status');

        // Tax Configuration Management
        Route::get('/tax-configurations', [TaxConfigurationController::class, 'index'])
            ->middleware('can:tax-configurations.view')
            ->name('tax-configurations.index');

        Route::get('/tax-configurations/create', [TaxConfigurationController::class, 'create'])
            ->middleware('can:tax-configurations.create')
            ->name('tax-configurations.create');

        Route::post('/tax-configurations', [TaxConfigurationController::class, 'store'])
            ->middleware('can:tax-configurations.create')
            ->name('tax-configurations.store');

        Route::get('/tax-configurations/{taxConfiguration}/edit', [TaxConfigurationController::class, 'edit'])
            ->middleware('can:tax-configurations.update')
            ->name('tax-configurations.edit');

        Route::put('/tax-configurations/{taxConfiguration}', [TaxConfigurationController::class, 'update'])
            ->middleware('can:tax-configurations.update')
            ->name('tax-configurations.update');

        Route::patch('/tax-configurations/{taxConfiguration}/status', [TaxConfigurationController::class, 'updateStatus'])
            ->middleware('can:tax-configurations.manage-status')
            ->name('tax-configurations.update-status');
    
    });