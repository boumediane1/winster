<?php

namespace Database\Seeders;

use App\Models\AppUser;
use App\Models\Settings;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class AppUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coins = Settings::query()->where('key', 'registration_bonus')->value('value');
        $users = User::factory()->count(10)->create();

        foreach ($users as $user) {
            AppUser::factory()->create([
                'uuid' => $user->uuid,
            ]);

            Transaction::create([
                'source' => 'Registration bonus',
                'coin_amount' => $coins,
                'user_uuid' => $user->uuid,
            ]);
        }
    }
}
