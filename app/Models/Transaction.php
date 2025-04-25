<?php

namespace App\Models;

use App\Reason;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = ['message', 'coin_amount', 'reason'];

    public function appUser(): BelongsTo
    {
        return $this->belongsTo(AppUser::class);
    }
}
