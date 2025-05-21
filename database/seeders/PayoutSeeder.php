<?php

namespace Database\Seeders;

use App\Models\AppUser;
use App\Models\Offerwall;
use App\Models\Payout;
use Illuminate\Database\Seeder;

class PayoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Payout::factory()
            ->count(50)
            ->state(function () {
                return [
                    'user_id' => AppUser::query()->inRandomOrder()->value('uuid'),
                    'offerwall_id' => Offerwall::query()->inRandomOrder()->value('id')
                ];
            })
            ->create();
    }
}
