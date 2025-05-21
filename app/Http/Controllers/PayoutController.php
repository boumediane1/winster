<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\Payout;
use App\Services\PayoutService;
use App\Services\WalletManagerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PayoutController extends Controller
{
    private PayoutService $payout;
    private WalletManagerService $walletManager;

    public function __construct(PayoutService $payout, WalletManagerService $walletManager)
    {
        $this->payout = $payout;
        $this->walletManager = $walletManager;
    }

    public function __invoke(Request $request)
    {
        $offerwall = $this->payout->validateCallbackURL($request);

         if ($offerwall === null) {
             return response()->json(['error' => 'Invalid callback URL'], Response::HTTP_UNPROCESSABLE_ENTITY);
         }

        $userId = $request->query($offerwall->user_id_param);
        $rewardAmount = $request->query($offerwall->reward_amount_param);
        $offerId = $request->query($offerwall->offer_id_param);
        $source = $request->route('offerwall');

        $user = AppUser::query()->find($userId);

        $payout = new Payout([
            'offer_id' => $offerId,
            'reward_amount' => $rewardAmount,
        ]);
        $payout->appUser()->associate($user);
        $payout->offerwall()->associate($offerwall);

        try {
            DB::transaction(function () use ($source, $rewardAmount, $user, $payout) {
                $payout->save();
                $this->walletManager->reward($user, $rewardAmount, $source);
            });
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }

        return response()->json(['success' => 'Payout has been made.'], Response::HTTP_CREATED);
    }
}
