<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAppUserRequest;
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
            ->with(['user', 'ban'])->paginate(7);

        return Inertia::render('registered-users/users', $users);
    }

    public function show(AppUser $user)
    {
        $user->load(['user', 'ban']);

        return Inertia::render('user-details/user-details', [
            'user' => $user,
            'withdrawals' => $user->withdrawals()->latest('updated_at')->get(),
            'transactions' => $user->transactions()->latest()->get(),
        ]);
    }

    public function update(UpdateAppUserRequest $request, User $user) {
        $validated = array_filter($request->validated(), fn ($value) => !is_null($value));
        $user->update($validated);
    }

    public function banned()
    {
        $users = AppUser::query()
            ->whereHas('ban')
            ->with(['user', 'ban'])
            ->orderBy('created_at')
            ->get();

        return Inertia::render('banned-users/users', [
            'users' => $users,
        ]);
    }
}
