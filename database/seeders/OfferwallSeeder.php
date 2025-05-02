<?php

namespace Database\Seeders;

use App\Models\Offerwall;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfferwallSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('offerwalls')->insert([
            [
                'name' => 'Adjoe',
                'slug' => 'adjoe',
                'logo' => '/offerwalls/adjoe.png',
                'sdk_key' => 'your-adjoe-sdk-key',
                'placement' => 'default_placement',
                'secret' => 'adjoe-secret',
                'reward_amount_param' => 'amount',
                'user_id_param' => 'user_id',
                'offer_id_param' => 'ad_id',
            ],
            [
                'name' => 'Tapjoy',
                'slug' => 'tapjoy',
                'logo' => '/offerwalls/tapjoy.png',
                'sdk_key' => 'your-tapjoy-sdk-key',
                'placement' => 'main_placement',
                'secret' => 'tapjoy-secret',
                'reward_amount_param' => 'reward',
                'user_id_param' => 'uid',
                'offer_id_param' => 'oid',
            ],
        ]);
    }
}
