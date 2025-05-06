<?php

namespace Database\Seeders;

use App\Models\Payout;
use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Payout::all()->each(function ($payout) {
            Transaction::create([
                'source' => $payout->offerwall->name,
                'coin_amount' => $payout->reward_amount,
                'user_uuid' => $payout->user_id,
                'created_at' => $payout->created_at,
            ]);
        });
    }
}
