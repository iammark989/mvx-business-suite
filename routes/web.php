<?php

use App\Http\Controllers\Admin\UomController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
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
                ->middleware('can:users.update-identity')
                ->name('users.edit');

            Route::put('/users/{user}', [UserController::class, 'update'])
                ->middleware('can:users.update-identity')
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

    });