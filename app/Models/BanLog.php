<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BanLog extends Model
{
    public function user(): BelongsTo {
        return $this->belongsTo(AppUser::class);
    }
}
