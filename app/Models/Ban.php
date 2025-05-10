<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ban extends Model
{
    use HasFactory;

    protected $fillable = ['reason'];

    public function appUser(): BelongsTo {
        return $this->belongsTo(AppUser::class, 'user_id');
    }
}
