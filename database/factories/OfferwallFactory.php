<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offerwall>
 */
class OfferwallFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->sentence();

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'logo' => fake()->image,
            'sdk_key' => fake()->uuid(),
            'placement' => fake()->sentence(),
            'secret' => fake()->password(),
            'reward_amount_param' => 'reward_amount',
            'user_id_param' => 'user_id',
            'offer_id_param' => 'offer_id',
        ];
    }
}
