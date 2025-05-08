<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ban>
 */
class BanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reason' => $this->faker->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
            'lifted_at' => null,
        ];
    }

    public function lifted(): static
    {
        return $this->state(fn () => [
            'lifted_at' => now()->subDays(rand(1, 30)),
        ]);
    }
}
