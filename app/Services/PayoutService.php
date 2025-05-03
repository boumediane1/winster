<?php

namespace App\Services;

use App\Models\Offerwall;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PayoutService
{
    public function validateCallbackURL(Request $request): Offerwall|null
    {
        $offerwall = Offerwall::query()
            ->where('slug', $request->route('offerwall'))
            ->where('secret', $request->route('secret'))
            ->first();

        if ($offerwall === null) {
            return null;
        }

        $validator = Validator::make($request->all(), [
            $offerwall->reward_amount_param => 'required|integer',
            $offerwall->user_id_param => [
                'required',
                'uuid',
                Rule::exists('app_users', 'uuid')
            ],
            $offerwall->offer_id_param => 'required'
        ]);

        if ($validator->fails()) {
            Log::error($validator->errors());
            return null;
        }

        return $offerwall;
    }
}
