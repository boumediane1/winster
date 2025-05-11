<?php

namespace App\Services;

use App\Models\AppUser;
use App\Models\Settings;

class SettingsService
{
    public function registrationBonus(): int
    {
        return Settings::where('key', 'registration_bonus')->value('value');
    }

    public function isAccountAllowed(string $device_id): bool
    {
        $prevent_duplicate_accounts = filter_var(
            Settings::where('key', 'prevent_duplicate_accounts')->value('value'),
            FILTER_VALIDATE_BOOLEAN
        );

        if ($prevent_duplicate_accounts) {
            return !AppUser::where('device_id', $device_id)->exists();
        }

        return true;
    }
}
