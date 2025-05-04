<?php

namespace Database\Seeders;

use App\Models\AppUser;
use App\Models\Withdrawal;
use Illuminate\Database\Seeder;

class WithdrawalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = AppUser::all();

        foreach ($users as $user) {
            Withdrawal::factory()->count(2)->create([
                'user_id' => $user->uuid
            ]);
        }
    }
}
