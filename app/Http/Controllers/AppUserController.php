<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\User;
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

    public function show(AppUser $user)
    {
        return Inertia::render('user-details/user-details', [
            'user' => $user,
            'withdrawals' => $user->withdrawals()->latest('updated_at')->get(),
            'transactions' => $user->transactions()->latest()->get(),
        ]);
    }

    public function banned()
    {
        $users = AppUser::query()
            ->with('user')
            ->with('latestBan')
            ->whereHas('bans', function ($query) {
                $query->whereNull('lifted_at');
            })->get();

        return Inertia::render('banned-users/users', [
            'users' => $users
        ]);
    }
}
