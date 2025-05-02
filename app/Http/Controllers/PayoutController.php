<?php

namespace App\Http\Controllers;

use App\Events\PayoutReceived;
use App\Http\Requests\StorePayoutRequest;
use App\Models\Payout;
use App\Models\User;
use App\Reason;

class PayoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StorePayoutRequest $request)
    {
        $user = User::find($request->query('user_uuid'));

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $transaction = new Payout([
            'coin_amount' => $request->query('coin_amount'),
            'app_name' => $request->query('app_name')
        ]);

        $transaction->user()->associate($user);

        $saved = $transaction->save();

        if ($saved) {
            PayoutReceived::dispatch(
                [
                    'user_uuid' => $transaction->user_uuid,
                    'message' => $transaction->app_name,
                    'coin_amount' => $transaction->coin_amount,
                    'reason' => Reason::Adjoe,
                ]
            );
        }

        return $saved;
    }
}
