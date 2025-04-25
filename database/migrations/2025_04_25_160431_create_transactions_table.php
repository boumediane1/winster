<?php

use App\Models\AppUser;
use App\Models\User;
use App\Reason;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('message');
            $table->integer('coin_amount');
            $table->enum('reason', [Reason::RegistrationBonus->value, Reason::Adjoe->value, Reason::Cashout->value]);
            $table->uuid('app_user_uuid');
            $table->foreign('app_user_uuid')->references('uuid')->on('app_users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
