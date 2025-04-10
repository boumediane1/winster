<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class WalletLogController extends Controller
{
    public function index() {
        return DB::table('wallet_logs')->orderBy('id', 'desc')->get();
    }
}
