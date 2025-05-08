<?php

namespace Database\Seeders;

use App\Models\AppUser;
use App\Models\Ban;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = AppUser::inRandomOrder()->take(5)->get();

        foreach ($users as $user) {
            Ban::factory()->create([
                'user_id' => $user->uuid,
            ]);
        }

        $liftedUsers = AppUser::whereNotIn('uuid', $users->pluck('uuid'))
            ->inRandomOrder()
            ->take(5)
            ->get();

        foreach ($liftedUsers as $user) {
            Ban::factory()->lifted()->create([
                'user_id' => $user->uuid,
            ]);
        }
    }
}
