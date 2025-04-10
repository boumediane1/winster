<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = DB::table('transactions')->orderBy('uuid', 'desc')->get();
        return TransactionResource::collection($transactions);
    }
}
