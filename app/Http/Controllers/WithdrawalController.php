<?php

namespace App\Http\Controllers;

use App\Models\Withdrawal;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class WithdrawalController {
    public function index(Request $request): Response
    {
        $status = $request->query('status') ?? 'pending';

        $withdrawals = Withdrawal::query()
            ->where('status', $status)
            ->with('appUser.user')
            ->paginate(7);

        $withdrawals = $withdrawals->through(fn ($withdrawal) => [
            ...$withdrawal->except('user_id'),
            'app_user' => $withdrawal->appUser
        ]);

        return Inertia::render('withdrawals/withdrawal-list', [
            'withdrawals' => $withdrawals
        ]);
    }
}
