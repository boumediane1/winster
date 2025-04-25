<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        return DB::table('transactions')
            ->where('app_user_uuid', auth()->id())
            ->orderBy('id', 'desc')->paginate(20);
    }
}
