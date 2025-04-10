<?php

namespace App\Models;

use App\Reason;
use Illuminate\Database\Eloquent\Model;

class WalletLog extends Model
{
    protected $fillable = ['message', 'coin_amount', 'reason'];
}
