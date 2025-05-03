<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payout extends Model
{
    public $timestamps = false;

    protected $fillable = ['offer_id', 'reward_amount'];

    public function offerwall(): BelongsTo
    {
        return $this->belongsTo(Offerwall::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(AppUser::class, 'user_id');
    }
}
