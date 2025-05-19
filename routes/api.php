<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PayoutController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/register/verify', [AuthController::class, 'verify']);

Route::get('/payout/{secret}/{offerwall}', PayoutController::class);

Route::get('/transactions', [TransactionController::class, 'index'])->middleware('auth:sanctum');
