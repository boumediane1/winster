<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = ['source', 'coin_amount'];
    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(AppUser::class);
    }

    protected function createdAt(): Attribute {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->diffForHumans()
        );
    }
}
