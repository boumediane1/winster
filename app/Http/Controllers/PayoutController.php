<?php

namespace App\Http\Controllers;

use App\Events\PayoutReceived;
use App\Http\Requests\StorePayoutRequest;
use App\Models\AdjoeTransaction;
use App\Models\User;
use App\Reason;

class PayoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StorePayoutRequest $request)
    {
        $sid = $this->calculate_sid(
            $request->query('user_uuid'),
            $request->query('trans_uuid'),
            $request->query('coin_amount'),
            $request->query('currency'),
            config('services.adjoe.s2s_token')
        );

        if ($sid != $request->query('sid')) {
            // return response()->json(['error' => 'Could not verify sid'], 400);
        }

        $user = User::find($request->query('user_uuid'));

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $transaction = new AdjoeTransaction([
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

    public function calculate_sid(
        string $user_uuid,
        string $trans_uuid,
        string $currency,
        string $coin_amount,
        string $s2s_token)
    {
        $data = $trans_uuid . $user_uuid . $currency . $coin_amount . $s2s_token;
        return sha1($data);
    }
}
