<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Settings::create([
            'key' => 'registration_bonus',
            'value'=> 1440,
        ]);

        Settings::create([
            'key' => 'referrer_reward',
            'value'=> 1000,
        ]);

        Settings::create([
            'key' => 'new_user_reward',
            'value'=> 500,
        ]);

        Settings::create([
            'key' => 'email_verification_required',
            'value'=> true,
        ]);

        Settings::create([
            'key' => 'prevent_duplicate_accounts',
            'value'=> 'false',
        ]);

        Settings::create([
            'key' => 'coins_per_usd',
            'value'=> 1000,
        ]);
    }
}
