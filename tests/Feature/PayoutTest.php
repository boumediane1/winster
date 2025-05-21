<?php

namespace Tests\Feature;

use App\Models\AppUser;
use App\Models\Offerwall;
use App\Models\Payout;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PayoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_creates_transaction_and_updates_balance_on_valid_tapjoy_payout(): void
    {
        $offerwall = Offerwall::factory()->create([
            'slug' => 'tapjoy',
            'secret' => 'secret',
            'reward_amount_param' => 'reward_amount',
            'user_id_param' => 'user_id',
            'offer_id_param' => 'offer_id'
        ]);

        $user = AppUser::factory()->for(User::factory())->create([
            'coin_amount' => 1000
        ]);

        $url = url()->query('/api/payout/secret/tapjoy', [
            $offerwall->user_id_param => $user->uuid,
            $offerwall->reward_amount_param => 2000,
            $offerwall->offer_id_param => fake()->uuid
        ]);

        $this->get($url);

        $user->refresh();

        $this->assertCount(1, Payout::all());
        $this->assertCount(1, Transaction::all());
        $this->assertEquals(3000, $user->coin_amount);
    }

    public function test_rejects_payout_with_invalid_secret(): void
    {
        $offerwall = Offerwall::factory()->create([
            'slug' => 'tapjoy',
            'secret' => 'correct',
            'reward_amount_param' => 'reward_amount',
            'user_id_param' => 'user_id',
            'offer_id_param' => 'offer_id'
        ]);

        $user = AppUser::factory()->for(User::factory())->create([
            'coin_amount' => 1000
        ]);

        $url = url()->query('/api/payout/incorrect/tapjoy', [
            $offerwall->user_id_param => $user->uuid,
            $offerwall->reward_amount_param => 2000,
            $offerwall->offer_id_param => fake()->uuid
        ]);

        $response = $this->get($url);

        $user->refresh();

        $response->assertJson(['error' => 'Invalid callback URL']);
        $this->assertCount(0, Payout::all());
        $this->assertCount(0, Transaction::all());
        $this->assertEquals(1000, $user->coin_amount);
    }
}
