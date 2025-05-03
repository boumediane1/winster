<?php

namespace App\Services;

use App\Models\AppUser;
use App\Models\Transaction;

class WalletManagerService {
    public function reward(AppUser $user, int $coins, string $source): void
    {
        $user->increment('coin_amount', $coins);

        $transaction = new Transaction([
            'source' => $source,
            'coin_amount' => $coins,
        ]);

        $transaction->user()->associate($user);

        $transaction->save();
    }
}
