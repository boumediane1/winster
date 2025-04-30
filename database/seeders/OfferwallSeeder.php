<?php

namespace Database\Seeders;

use App\Models\Offerwall;
use Illuminate\Database\Seeder;

class OfferwallSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Offerwall::create([
            'title' => 'Adjoe',
        ]);

        Offerwall::create([
            'title' => 'Tapjoy'
        ]);
    }
}
