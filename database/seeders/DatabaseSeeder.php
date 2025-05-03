<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $path = base_path('data.sql');
        DB::unprepared(file_get_contents($path));

        $this->call([
            AppUserSeeder::class,
            SettingSeeder::class,
            OfferwallSeeder::class
        ]);
    }
}
