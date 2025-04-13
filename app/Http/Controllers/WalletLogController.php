<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class WalletLogController extends Controller
{
    public function index()
    {
        return DB::table('wallet_logs')
            ->where('user_uuid', auth()->id())
            ->orderBy('id', 'desc')->paginate(20);
    }
}
