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
        $allowed = filter_var(
            Settings::where('key', 'multiple_accounts_allowed')->value('value'),
            FILTER_VALIDATE_BOOLEAN
        );

        if (!$allowed) {
            return !AppUser::where('device_id', $device_id)->exists();
        }

        return true;
    }
}
