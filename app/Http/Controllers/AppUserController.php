<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class AppUserController extends Controller
{
    public function index() {
        $users = User::where('is_admin', false)->get();

        return Inertia::render('registered-users/users', [
            'users' => $users
        ]);
    }

    public function edit() {
        return Inertia::render('user-details/user-details', [
            'user' => null
        ]);
    }

    public function banned() {
        return Inertia::render('banned-users/users');
    }
}
