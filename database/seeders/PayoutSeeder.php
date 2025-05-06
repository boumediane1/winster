<?php

namespace Database\Seeders;

use App\Models\Payout;
use Illuminate\Database\Seeder;

class PayoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Payout::factory()->count(50)->create();
    }
}
