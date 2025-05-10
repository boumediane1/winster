<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\Ban;
use Illuminate\Http\Request;

class BanController extends Controller
{
    public function store(Request $request)
    {
        $ban = new Ban([
            'reason' => $request->input('reason'),
        ]);

        $user = AppUser::query()->find($request->input('user_id'));

        $ban->appUser()->associate($user);

        $ban->save();
    }

    public function destroy(Ban $ban) {
        $ban->delete();
    }

    public function update(Ban $ban, Request $request) {
        $ban->update([
            'reason' => $request->input('reason')
        ]);
    }
}
