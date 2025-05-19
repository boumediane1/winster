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
            'key' => 'email_verification_required',
            'value'=> true,
        ]);

        Settings::create([
            'key' => 'prevent_duplicate_accounts',
            'value'=> 'false',
        ]);
    }
}
