<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OfferwallTransaction extends Model
{
    public function offerwall(): BelongsTo {
        return $this->belongsTo(Offerwall::class);
    }
}
