<?php

namespace App\Services;

use Stevebauman\Location\Facades\Location;

class LocationService
{
    public function countyCode(): ?string
    {
        if ($position = Location::get()) {
            return $position->countryCode;
        }

        return null;
    }
}
