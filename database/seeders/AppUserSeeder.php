<?php

namespace Database\Seeders;

use App\Models\AppUser;
use App\Models\User;
use Illuminate\Database\Seeder;

class AppUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory()->count(10)->create();

        foreach ($users as $user) {
            AppUser::factory()->create([
                'uuid' => $user->uuid,
            ]);
        }
    }
}
