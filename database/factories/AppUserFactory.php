<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Stevebauman\Location\Facades\Location;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AppUser>
 */
class AppUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ip = $this->faker->ipv4;

        return [
            'coin_amount' => $this->faker->numberBetween(0, 1000),
            'device_id' => $this->faker->uuid,
            'is_banned' => $this->faker->boolean,
            'ip_address' => $this->faker->ipv4,
            'country_code' => Location::get($ip)->ip ?? null,
        ];
    }
}
