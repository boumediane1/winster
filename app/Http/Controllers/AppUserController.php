<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\User;
use Inertia\Inertia;

class AppUserController extends Controller
{
    public function index() {
        $users = User::where('is_admin', false)->get();

        return Inertia::render('users/users', [
            'users' => $users
        ]);
    }

    public function edit() {
        return Inertia::render('users/UserDetails', [
            'user' => null
        ]);
    }
}
