<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payout extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['offer_id', 'reward_amount'];

    public function offerwall(): BelongsTo
    {
        return $this->belongsTo(Offerwall::class);
    }

    public function appUser(): BelongsTo
    {
        return $this->belongsTo(AppUser::class, 'user_id');
    }

    public static function newLeads() {
        return self::query()->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])->count();
    }
}
