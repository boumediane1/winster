<?php

namespace Database\Seeders;

use App\Models\AppUser;
use App\Models\User;
use App\Models\Withdrawal;
use Illuminate\Database\Seeder;

class WithdrawalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Withdrawal::factory()->count(50)->make()->each(function ($withdrawal) {
            $withdrawal->user_id = AppUser::inRandomOrder()->first()->uuid;
            $withdrawal->save();
        });
    }
}
