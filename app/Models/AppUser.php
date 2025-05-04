<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AppUser extends Model
{
//    protected $table = 'app_users';
    use HasFactory, HasUuids;
    protected $primaryKey = 'uuid';
    protected $fillable = ['device_id', 'coin_amount', 'country_code'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uuid');
    }

    public function transactions(): HasMany {
        return $this->hasMany(Transaction::class);
    }
}
