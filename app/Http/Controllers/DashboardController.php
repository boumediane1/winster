<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use Inertia\Inertia;

class DashboardController
{
    public function index()
    {
        return Inertia::render('dashboard/dashboard', [
            'total_users' => AppUser::usersInLastMonth()
        ]);
    }
}
