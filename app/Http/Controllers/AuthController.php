<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisterRequest;
use App\Mail\OtpSent;
use App\Models\User;
use App\Reason;
use App\Services\LocationService;
use App\Services\SettingsService;
use DB;
use Ichtrojan\Otp\Otp;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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
        $can_register_with_device = $this->settings->canRegisterWithDevice($request->device_id);
        $email_verification_required = $this->settings->emailVerificationRequired();

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'device_id' => $request->device_id,
            'ip' => $request->ip(),
        ];

        if (!$can_register_with_device) {
            return response()->json(
                ['error' => 'Multiple accounts per device are not allowed.'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        if ($email_verification_required && false) {
            $otp = new Otp()->generate($request->email, 'numeric');

            Cache::put("register:{$request->email}", $data, now()->addMinutes(10));

            Mail::to($request->email)->send(new OtpSent($otp->token));

            return response()->json([
                'email_verification_required' => true,
                'message' => 'OTP sent to your email',
            ]);
        }


        return $this->completeRegistration($data);
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

    public function verify(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'token' => 'required|integer'
        ]);

        $valid = new Otp()->validate($validated['email'], $validated['token']);

        if (!$valid) {
            return response()->json(['error' => 'Invalid or expired OTP'], 422);
        }

        $cache = Cache::pull("register:{$request->email}");

        if (!$cache) {
            return response()->json(['error' => 'registration data expired. Please register again'], 410);
        }

        return $this->completeRegistration($cache);
    }

    public function completeRegistration(array $data): JsonResponse
    {
        DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $bonus = $this->settings->registrationBonus();

            $appUser = $user->appUser()->create([
                'device_id' => $data['device_id'],
                'coin_amount' => $bonus,
                'country_code' => $this->location->countyCode(),
                'ip_address' => $data['ip']
            ]);

            $appUser->transactions()->create([
                'message' => 'Welcome gift',
                'coin_amount' => $bonus,
                'source' => Reason::RegistrationBonus
            ]);

            return $user;
        });

        return response()->json(['message' => 'Registration successful']);
    }
}
