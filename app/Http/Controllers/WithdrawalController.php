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
            ->orderBy('updated_at', 'desc')
            ->paginate(7);

        $withdrawals = $withdrawals->through(fn ($withdrawal) => [
            ...$withdrawal->except('user_id'),
            'app_user' => $withdrawal->appUser
        ]);

        return Inertia::render('withdrawals/withdrawal-list', [
            'withdrawals' => $withdrawals
        ]);
    }

    public function action(Request $request) {
        $action = $request->route('action');
        $status = $action === 'approve' ? 'completed' : 'rejected';
        Withdrawal::query()
            ->whereIn('id', $request->ids)
            ->update(['status' => $status]);

        return to_route('withdrawals.index');
    }
}
