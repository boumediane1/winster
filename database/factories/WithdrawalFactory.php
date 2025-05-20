<?php

namespace Database\Factories;

use App\Models\Settings;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Withdrawal>
 */
class WithdrawalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $coins_per_usd = Settings::query()->where('key', 'coins_per_usd')->value('value');

        $coins = $this->faker->numberBetween(0, 1000);

        return [
            'payment_method' => 'Paypal',
            'coins' => $coins,
            'usd_amount' => $coins / $coins_per_usd,
            'status' => $this->faker->randomElement(['pending', 'completed', 'rejected']),
        ];
    }
}
