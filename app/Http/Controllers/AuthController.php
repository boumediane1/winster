<?php

namespace App\Http\Controllers;

use App\Events\UserRegistered;
use App\Http\Requests\StoreRegisterRequest;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use App\Models\AppUser;
use App\Reason;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AuthController extends Controller
{
    /**
     * @throws Throwable
     */
    public function register(StoreRegisterRequest $request)
    {
        $coins = Setting::firstOrFail()->value('welcome_gift');

        $user = DB::transaction(function () use ($request, $coins) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $appUser = $user->appUser()->create([
                'device_id' => $request->device_id,
                'coin_amount' => $coins,
            ]);

            $appUser->transactions()->create([
                'message' => 'Welcome gift',
                'coin_amount' => $coins,
                'reason' => Reason::RegistrationBonus
            ]);

            return $user;
        });


        return response()->json($user, Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails())
            return $validator->errors();

        $credentials = request(['email', 'password']);

        if (!auth()->attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ]);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('token')->plainTextToken;

        return response()->json(['access_token' => $token, 'user' => $user]);
    }
}
