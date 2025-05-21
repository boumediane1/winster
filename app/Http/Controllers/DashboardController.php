<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\Payout;
use App\Models\Withdrawal;
use Inertia\Inertia;

class DashboardController
{
    public function index()
    {
        return Inertia::render('dashboard/dashboard', [
            'new_users' => AppUser::usersInLastMonth(),
            'new_leads' => Payout::newLeads(),
            'withdrawn_in_last_month' => Withdrawal::newWithdrawn(),
            'earnings_in_last_month' => Payout::earnings()
        ]);
    }
}
