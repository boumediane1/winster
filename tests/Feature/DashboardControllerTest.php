<?php

namespace Tests\Feature;

use App\Models\AppUser;
use App\Models\Offerwall;
use App\Models\Payout;
use App\Models\Settings;
use App\Models\User;
use App\Models\Withdrawal;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_count_new_users_in_last_month()
    {
        $this->actingAs(User::factory()->create());

        AppUser::factory()->for(User::factory())->create([
            'created_at' => Carbon::now()->subDays(10)
        ]);

        AppUser::factory()->for(User::factory())->create([
            'created_at' => Carbon::now()->subMonths(2)
        ]);

        $this->get('/dashboard')->assertInertia(fn(AssertableInertia $page) => $page
            ->component('dashboard/dashboard')
            ->where('new_users', 1)
        );
    }

    public function test_count_new_leads_in_last_month()
    {
        $this->actingAs(User::factory()->create());

        $offerwall = Offerwall::query()->create([
            'name' => 'name',
            'slug' => 'slug',
            'sdk_key' => 'sdk_key',
            'placement' => 'placement',
            'secret' => 'secret',
            'reward_amount_param' => 'reward_amount_param',
            'user_id_param' => 'user_id_param',
            'offer_id_param' => 'offer_id_param'
        ]);

        Payout::factory()->for($offerwall)->for(AppUser::factory()->for(User::factory()))->create([
            'created_at' => Carbon::now()->subDays(10)
        ]);

        Payout::factory()->for($offerwall)->for(AppUser::factory()->for(User::factory()))->create([
            'created_at' => Carbon::now()->subMonths(2)
        ]);

        $this->get('/dashboard')->assertInertia(fn(AssertableInertia $page) => $page
            ->component('dashboard/dashboard')
            ->where('new_leads', 1)
        );
    }

    public function test_sum_withdrawn_in_last_month()
    {
        $this->actingAs(User::factory()->create());

        $coins_per_usd = 1000;

        Settings::query()->create([
            'key' => 'coins_per_usd',
            'value' => $coins_per_usd
        ]);

        Withdrawal::factory()->for(AppUser::factory()->for(User::factory()))->create([
            'usd_amount' => 2.5,
            'status' => 'completed',
            'updated_at' => Carbon::now()->subDay()
        ]);

        Withdrawal::factory()->for(AppUser::factory()->for(User::factory()))->create([
            'coins' => 500,
            'usd_amount' => 5,
            'status' => 'completed',
            'updated_at' => Carbon::now()->subMonths(2)
        ]);

        $this->get('/dashboard')->assertInertia(fn(AssertableInertia $page) => $page
            ->component('dashboard/dashboard')
            ->where('withdrawn_in_last_month', 2.5)
        );
    }

    public function test_sum_earnings_in_last_month()
    {
        $this->actingAs(User::factory()->create());

        $offerwall = Offerwall::factory();

        Payout::factory()
            ->for($offerwall)
            ->for(AppUser::factory()->for(User::factory()))
            ->create(['usd_amount' => 2, 'created_at' => Carbon::now()->subMonths(2)]);

        Payout::factory()
            ->for($offerwall)
            ->for(AppUser::factory()->for(User::factory()))
            ->create(['usd_amount' => 3, 'created_at' => Carbon::now()->subDay()]);

        $this->get('/dashboard')->assertInertia(fn(AssertableInertia $page) => $page
            ->component('dashboard/dashboard')
            ->where('earnings_in_last_month', 3)
        );
    }
}
