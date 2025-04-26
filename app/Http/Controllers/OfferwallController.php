<?php

namespace App\Http\Controllers;

use App\Models\Offerwall;
use Inertia\Inertia;

class OfferwallController extends Controller
{
    public function index() {
        return Inertia::render('offerwalls/offerwalls');
    }

    public function show(Offerwall $offerwall) {
        return Inertia::render('offerwalls/offerwall', [
            'offerwall' => $offerwall
        ]);
    }
}
