<?php

namespace App\Models;

use App\Reason;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WalletLog extends Model
{
    protected $fillable = ['message', 'coin_amount', 'reason'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
