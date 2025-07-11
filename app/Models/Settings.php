<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    public $incrementing = false;
    protected $primaryKey = 'key';
    public $timestamps = false;

    protected $fillable = ['key', 'value'];
}
