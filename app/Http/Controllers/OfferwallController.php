<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOfferwallRequest;
use App\Http\Requests\UpdateOfferwallRequest;
use App\Models\Offerwall;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OfferwallController extends Controller
{
    public function index() {
        return Inertia::render('offerwalls/offerwall-list', [
            'offerwalls' => Offerwall::query()->orderBy('id')->get()
        ]);
    }

    public function create() {
        return Inertia::render('offerwalls/offerwall-form');
    }

    public function store(StoreOfferwallRequest $request) {
        $validated = $request->validated();

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = time() . '-' . $file->getClientOriginalName();
            $path = $file->storeAs('offerwalls', $filename, 'public');
            $validated['logo'] = $path;
        } else {
            unset($validated['logo']);
        }

        Offerwall::create($validated);

        return to_route('offerwalls.index');
    }

    public function edit(Offerwall $offerwall) {
        return Inertia::render('offerwalls/offerwall-form', [
            'offerwall' => $offerwall
        ]);
    }

    public function update(UpdateOfferwallRequest $request, Offerwall $offerwall) {
        $validated = $request->validated();

        if ($request->hasFile('logo')) {
            if ($offerwall->logo && Storage::disk('public')->exists($offerwall->logo)) {
                Storage::disk('public')->delete($offerwall->logo);
            }

            $file = $request->file('logo');
            $filename = time() . '-' . $file->getClientOriginalName();
            $path = $file->storeAs('offerwalls', $filename, 'public');
            $validated['logo'] = $path;
        } else {
            unset($validated['logo']);
        }

        $offerwall->update($validated);

        return to_route('offerwalls.index');
    }
}
