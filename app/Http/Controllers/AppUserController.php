<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class AppUserController extends Controller
{
    public function index()
    {
        $users = User::where('is_admin', false)
            ->with('appuser')->get();

        return Inertia::render('registered-users/users', [
            'users' => $users->map(function (User $user) {
                return [
                    'uuid' => $user->uuid,
                    'name' => $user->name,
                    'email' => $user->email,
                    'createdAt' => $user->created_at,
                    'coin_amount' => $user->appUser->coin_amount,
                    'device_id' => $user->appUser->device_id,
                    'banned' => $user->appUser->is_banned,
                    'countryCode' => $user->appUser->country_code
                ];
            })
        ]);
    }

    public function edit()
    {
        return Inertia::render('user-details/user-details', [
            'user' => null
        ]);
    }

    public function banned()
    {
        return Inertia::render('banned-users/users');
    }
}
