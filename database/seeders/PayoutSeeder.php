<?php

namespace Database\Seeders;

use App\Models\AppUser;
use App\Models\Payout;
use Illuminate\Database\Seeder;

class PayoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Payout::factory()->for(AppUser::query()->inRandomOrder()->first())->count(50)->create();
    }
}
