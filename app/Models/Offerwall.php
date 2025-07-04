<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offerwall extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'slug',
        'logo',
        'sdk_key',
        'placement',
        'secret',
        'reward_amount_param',
        'user_id_param',
        'offer_id_param',
    ];
}
