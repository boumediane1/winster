<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Withdrawal extends Model
{
    use HasFactory;
    protected $casts = [
        'user_id' => 'string',
    ];

    public function appUser(): BelongsTo {
        return $this->belongsTo(AppUser::class, 'user_id', 'uuid');
    }

    protected function updatedAt(): Attribute {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->diffForHumans()
        );
    }

    public static function newWithdrawn() {
        return self::query()
            ->where('status', 'completed')
            ->whereBetween('updated_at', [Carbon::now()->subMonth(), Carbon::now()])->sum('usd_amount');
    }
}
