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
        $position = Location::get($ip);
        $countryCode =  $position ? $position->countryCode : null;

        return [
            'coin_amount' => $this->faker->numberBetween(0, 1000),
            'device_id' => $this->faker->uuid,
            'banned' => $this->faker->boolean,
            'ip_address' => $ip,
            'country_code' => $countryCode,
        ];
    }
}
