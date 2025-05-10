<?php

namespace App\Http\Controllers;

use App\Models\Withdrawal;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class WithdrawalController
{
    public function index(Request $request): Response
    {
        $status = $request->query('status') ?? 'pending';

        $withdrawals = Withdrawal::query()
            ->where('status', $status)
            ->with('appUser.user')
            ->orderBy('updated_at', 'desc')
            ->paginate(7);

        $withdrawals = $withdrawals->through(fn($withdrawal) => [
            ...$withdrawal->except('user_id'),
            'app_user' => $withdrawal->appUser,
        ]);

        return Inertia::render('withdrawals/withdrawal-list', [
            'withdrawals' => $withdrawals
        ]);
    }

    public function reject(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => ['integer', Rule::exists('withdrawals', 'id')],
            'reason' => 'required|string',
            'take_amount' => 'nullable|boolean'
        ]);

        Withdrawal::query()
            ->whereIn('id', $validated['ids'])
            ->update(['status' => 'rejected']);

        $withdrawals = Withdrawal::query()
            ->whereIn('id', $validated['ids'])
            ->with('appUser')
            ->get();

        if ($request['takeAmount']) {
            foreach ($withdrawals as $withdrawal) {
                $user = $withdrawal->appUser;
                $user->coin_amount -= $withdrawal->coins;
                $user->save();
            }
        }
    }

    public function approve(Request $request)
    {
        Withdrawal::query()
            ->whereIn('id', $request->ids)
            ->update(['status' => 'completed']);

        $withdrawals = Withdrawal::query()
            ->whereIn('id', $request['ids'])
            ->with('appUser')
            ->get();

        foreach ($withdrawals as $withdrawal) {
            $user = $withdrawal->appUser;
            $user->coin_amount -= $withdrawal->coins;
            $user->save();
        }

        return to_route('withdrawals.index');
    }
}
