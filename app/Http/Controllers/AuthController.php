<?php

namespace App\Http\Controllers;

use App\Events\UserRegistered;
use App\Models\User;
use App\Reason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails())
            return $validator->errors();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'coin_amount' => 1440
        ]);

        UserRegistered::dispatch([
            'user_uuid' => $user->uuid,
            'message' => 'Welcome',
            'coin_amount' => 1440,
            'reason' => Reason::RegistrationBonus,
        ]);


        return response()->json($user);
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
