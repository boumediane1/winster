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
        $withdrawals = $user->withdrawals()->get()->map(fn($withdrawal) => [
            ...$withdrawal->toArray(),
            'updated_at' => $withdrawal->updated_at->diffForHumans()
        ]);

        return Inertia::render('user-details/user-details', [
            'withdrawals' => $withdrawals
        ]);
    }

    public function banned()
    {
        return Inertia::render('banned-users/users');
    }
}
