<?php

namespace App\Http\Controllers;

use App\Models\Withdrawal;
use Inertia\Inertia;

class WithdrawalController {
    public function index() {
        $withdrawals = Withdrawal::with('appUser.user')->paginate(7);

        $withdrawals = $withdrawals->through(fn ($withdrawal) => [
            ...$withdrawal->except('user_id'),
            'app_user' => $withdrawal->appUser
        ]);

        return Inertia::render('withdrawals/withdrawal-list', [
            'withdrawals' => $withdrawals
        ]);
    }
}
