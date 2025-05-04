<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Withdrawal extends Model
{
    public $timestamps = false;

    use HasFactory;

    protected $casts = [
        'user_id' => 'string',
    ];

    public function appUser(): BelongsTo {
        return $this->belongsTo(AppUser::class, 'user_id', 'uuid');
    }
}
