<?php

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
        })->name('dashboard');

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
    });