<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AppUser extends Model
{
    protected $primaryKey = 'uuid';
    protected $fillable = ['device_id', 'coin_amount'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
