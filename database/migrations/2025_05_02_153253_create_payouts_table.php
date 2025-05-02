<?php

use App\Models\Offerwall;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payouts', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->foreignIdFor(Offerwall::class)->constrained();
            $table->foreignUuid('user_uuid')->references('uuid')->on('users');
            $table->integer('reward_amount');
            $table->string('offer_id');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payouts');
    }
};
