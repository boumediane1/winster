<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RewardSettingsController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('settings/rewards');
    }
}
