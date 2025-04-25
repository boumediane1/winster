<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class OfferwallController extends Controller
{
    public function index() {
        return Inertia::render('offerwalls/offerwalls');
    }
}
