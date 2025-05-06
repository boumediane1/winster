<?php

namespace Database\Factories;

use App\Models\Offerwall;
use App\Models\Payout;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $payout = Payout::inRandomOrder()->first();

        return [
            'source' => $payout->offerwall->name,
            'coin_amount' => $payout->reward_amount,
            'user_uuid' => $payout->user_id,
            'created_at' => $payout->created_at,
        ];
    }
}
