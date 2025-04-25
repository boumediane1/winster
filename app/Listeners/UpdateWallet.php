<?php

namespace App\Listeners;

use App\Events\PayoutReceived;
use App\Events\UserRegistered;
use App\Models\AppUser;
use App\Models\Transaction;

class UpdateWallet
{
    /**
     * Handle the event.
     */
    public function handle(UserRegistered|PayoutReceived $event): void
    {
        $appUser = AppUser::findOrFail($event->data['user_uuid']);

        $appUser->increment('coin_amount', $event->data['coin_amount']);

        $transaction = new Transaction([
            'message' => $event->data['message'],
            'coin_amount' => $event->data['coin_amount'],
            'reason' => $event->data['reason'],
        ]);

        $transaction->appUser()->associate($appUser);

        $transaction->save();
    }
}
