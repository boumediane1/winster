<?php

namespace Tests\Feature;

use App\Models\AppUser;
use App\Models\User;
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
            ->where('total_users', AppUser::usersInLastMonth())
        );
    }
}
