<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offerwall extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'network_name',
        'logo',
        'sdk_key',
        'placement',
        'url_secret',
        'reward_amount_param',
        'user_id_param',
        'offer_id_param',
    ];
}
