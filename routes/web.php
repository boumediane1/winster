<?php

use App\Http\Controllers\Admin\AuthenticatedSessionController;
use App\Http\Controllers\AppUserController;
use App\Http\Controllers\OfferwallController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login')
        ->middleware('guest');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->name('login')
        ->middleware('guest');
});


Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/offerwalls', [OfferwallController::class, 'index'])->name('offerwalls.index');
    Route::get('/offerwalls/{offerwall}', [OfferwallController::class, 'show'])->name('offerwall.show');

    Route::get('/users', [AppUserController::class, 'index']);
    Route::get('/users/{user}', [AppUserController::class, 'edit'])->name('users.edit');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
