<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SecuritySettingsController extends Controller
{
    public function index() {
        return Inertia::render('settings/security');
    }
}
