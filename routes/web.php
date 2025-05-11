<?php

use App\Http\Controllers\Admin\AuthenticatedSessionController;
use App\Http\Controllers\AppUserController;
use App\Http\Controllers\BanController;
use App\Http\Controllers\OfferwallController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RewardSettingsController;
use App\Http\Controllers\SecuritySettingsController;
use App\Http\Controllers\WithdrawalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->middleware('guest');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->name('login')
        ->middleware('guest');
});


Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard/dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/users', [AppUserController::class, 'index'])->name('users.index');
    Route::get('/users/banned', [AppUserController::class, 'banned'])->name('users.banned');
    Route::get('/users/{user}', [AppUserController::class, 'show'])->name('users.show');
    Route::put('/users/{user}', [AppUserController::class, 'update'])->name('users.update');

    Route::get('/offerwalls', [OfferwallController::class, 'index'])->name('offerwalls.index');
    Route::get('/offerwalls/create', [OfferwallController::class, 'create'])->name('offerwall.create');
    Route::post('/offerwalls', [OfferwallController::class, 'store'])->name('offerwall.store');
    Route::get('/offerwalls/{offerwall}/edit', [OfferwallController::class, 'edit'])->name('offerwall.edit');
    Route::put('/offerwalls/{offerwall}', [OfferwallController::class, 'update'])->name('offerwall.update');

    Route::get('/withdrawals', [WithdrawalController::class, 'index'])->name('withdrawals.index');
    Route::patch('/withdrawals/reject', [WithdrawalController::class, 'reject'])->name('withdrawals.reject');
    Route::patch('/withdrawals/approve', [WithdrawalController::class, 'approve'])->name('withdrawals.approve');

    Route::post('bans', [BanController::class, 'store'])->name('bans.store');
    Route::delete('bans/{ban}', [BanController::class, 'destroy'])->name('bans.destroy');
    Route::patch('bans/{ban}', [BanController::class, 'update'])->name('bans.update');

    Route::get('settings/rewards', [RewardSettingsController::class, 'index'])->name('settings.index');
    Route::get('settings/security', [SecuritySettingsController::class, 'index'])->name('settings.index');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
