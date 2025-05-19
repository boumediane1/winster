<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AppUser extends Model
{
    use HasFactory, HasUuids;
    protected $primaryKey = 'uuid';
    protected $fillable = ['device_id', 'coin_amount', 'country_code', 'ip_address'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uuid');
    }

    public function transactions(): HasMany {
        return $this->hasMany(Transaction::class, 'user_uuid');
    }

    public function withdrawals(): HasMany {
        return $this->hasMany(Withdrawal::class, 'user_id');
    }

    public function ban(): HasOne {
        return $this->hasOne(Ban::class, 'user_id');
    }

    public static function usersInLastMonth() {
        return self::query()
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->count();
    }
}
