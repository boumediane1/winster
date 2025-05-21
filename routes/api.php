<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PayoutController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::post('/register/verify', [AuthController::class, 'verify']);

    Route::get('/payout/{secret}/{offerwall}', PayoutController::class)->middleware('auth:sanctum');

    Route::get('/transactions', [TransactionController::class, 'index'])->middleware('auth:sanctum');
});

