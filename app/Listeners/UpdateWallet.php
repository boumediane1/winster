<?php

namespace App\Listeners;

use App\Events\PayoutReceived;
use App\Events\UserRegistered;
use App\Models\User;
use App\Models\WalletLog;

class UpdateWallet
{
    /**
     * Handle the event.
     */
    public function handle(UserRegistered|PayoutReceived $event): void
    {
        $user = User::findOrFail($event->data['user_uuid']);

        $user->increment('coin_amount', $event->data['coin_amount']);

        $wallet_log = new WalletLog([
            'message' => $event->data['message'],
            'coin_amount' => $event->data['coin_amount'],
            'reason' => $event->data['reason'],
        ]);

        $wallet_log->user()->associate($user);

        $wallet_log->save();
    }
}
