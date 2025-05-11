<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Inertia\Inertia;

class RewardSettingsController extends Controller
{
    public function index() {
        $settings = Settings::all()->flatMap(fn ($item) => [$item->key => $item->value]);

        return Inertia::render('settings/rewards', [
            'settings' => $settings
        ]);
    }

    public function update()
    {
        $validated = request()->validate([
            'registration_bonus' => 'required|integer',
            'referrer_reward' => 'required|integer',
            'new_user_reward' => 'required|integer',
        ]);

        $keys = [
            'registration_bonus',
            'referrer_reward',
            'new_user_reward',
        ];

        foreach ($keys as $key) {
            Settings::query()->where('key', $key)->update([
                'value' => $validated[$key],
            ]);
        }
    }
}
