<?php

namespace Database\Factories;

use App\Models\AppUser;
use App\Models\Offerwall;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payout>
 */
class PayoutFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'offerwall_id' => Offerwall::inRandomOrder()->first()->id,
            'offer_id' => $this->faker->uuid,
//            'user_id' => AppUser::inRandomOrder()->first()->uuid,
            'reward_amount' => $this->faker->numberBetween(10, 100),
            'created_at' => now(),
        ];
    }
}
