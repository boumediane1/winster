<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisterRequest;
use App\Models\User;
use App\Reason;
use App\Services\LocationService;
use App\Services\SettingsService;
use DB;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AuthController extends Controller
{
    protected SettingsService $settings;
    protected LocationService $location;

    public function __construct(SettingsService $settings, LocationService $location)
    {
        $this->settings = $settings;
        $this->location = $location;
    }

    /**
     * @throws Throwable
     */
    public function register(StoreRegisterRequest $request)
    {
        if (!$this->settings->isAccountAllowed($request->device_id)) {
            return response()->json(
                ['error' => 'Multiple accounts per device are not allowed.'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $user = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            if ($this->settings->isEmailVerificationRequired()) {
                event(new Registered($user));
            }

            $bonus = $this->settings->registrationBonus();

            $appUser = $user->appUser()->create([
                'device_id' => $request->device_id,
                'coin_amount' => $bonus,
                'country_code' => $this->location->countyCode(),
                'ip_address' => $request->ip()
            ]);

            $appUser->transactions()->create([
                'message' => 'Welcome gift',
                'coin_amount' => $bonus,
                'source' => Reason::RegistrationBonus
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
