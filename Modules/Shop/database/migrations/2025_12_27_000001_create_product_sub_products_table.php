<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_sub_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->json('slides');
            $table->string('name');
            $table->string('capacity'); // Ah
            $table->string('voltage')->nullable(); // V
            $table->string('box')->nullable();
            $table->string('length')->nullable(); // mm
            $table->string('height')->nullable(); // mm
            $table->string('weight')->nullable(); // kg
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_sub_products');
    }
};








