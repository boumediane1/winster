<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateOfferwallRequest;
use App\Models\Offerwall;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OfferwallController extends Controller
{
    public function index() {
        return Inertia::render('offerwalls/offerwalls', [
            'offerwalls' => Offerwall::all()
        ]);
    }

    public function edit(Offerwall $offerwall) {
        return Inertia::render('offerwalls/offerwall-item', [
            'offerwall' => $offerwall
        ]);
    }

    public function update(UpdateOfferwallRequest $request, Offerwall $offerwall) {
        $validated = $request->validated();

        if ($request->hasFile('logo')) {
            if ($offerwall->logo && Storage::disk('public')->exists($offerwall->logo)) {
                Storage::disk('public')->delete($offerwall->logo);
            }

            $logo = $request->file('logo');
            $filename = time() . '-' . $logo->getClientOriginalName();
            $path = $logo->storeAs('offerwalls', $filename, 'public');
            $validated['logo'] = $path;
        } else {
            unset($validated['logo']);
        }

        $offerwall->update($validated);
    }
}
