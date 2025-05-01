<?php

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
        Schema::create('app_users', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->foreign('uuid')->references('uuid')->on('users')->onDelete('cascade');
            $table->integer('coin_amount')->default(0);
            $table->string('device_id');
            $table->boolean('is_banned')->default(false);
            $table->ipAddress();
            $table->string('country_code')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_users');
    }
};
