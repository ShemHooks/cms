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
        Schema::create('app_usage_logs', function (Blueprint $table) {
            $table->id();
           $table->foreignId('user_id')->references('id')->on('users');
            $table->string('app_name');
            $table->String('package_name')->nullable();
            $table->integer('duration');
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_usage_logs');
    }
};
