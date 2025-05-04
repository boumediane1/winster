<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppUserController extends Controller
{
    public function index(Request $request)
    {
        $users = AppUser::query()
            ->whereRelation('user', 'name', 'ILIKE', '%' . $request->query('name') . '%')
            ->with('user')->paginate(7);

        return Inertia::render('registered-users/users', $users);
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
