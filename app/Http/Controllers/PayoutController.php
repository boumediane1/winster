<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class PayoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $sid = $this->calculate_sid(
            $request->query('trans_uuid'),
            $request->query('user_uuid'),
            $request->query('currency'),
            $request->query('coin_amount'),
            config('services.adjoe.s2s_token')
        );

        if ($sid != $request->query('sid')) {
            return response()->json(['error' => 'Could not verify sid'], 400);
        }

        $user = User::where('uuid', $request->query('user_uuid'))->firstOrFail();

        $transaction = new Transaction([
            'coin_amount' => $request->query('coin_amount'),
            'app_name' => $request->query('app_name')
        ]);
        $transaction->user()->associate($user);
        $transaction->save();
    }

    public function calculate_sid(
        string $user_uuid,
        string $trans_uuid,
        string $currency,
        int    $coin_amount,
        string $s2s_token)
    {
        $data = $trans_uuid . $user_uuid . $currency . $coin_amount . $s2s_token;
        return sha1($data);
    }
}
