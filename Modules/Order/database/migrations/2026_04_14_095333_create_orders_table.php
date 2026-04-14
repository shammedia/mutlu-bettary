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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('status')->nullable()->default('pending');
            $table->string('address')->nullable();
            $table->string('delivery_type')->nullable();
            $table->string('map')->nullable();
            $table->double('shipping')->nullable()->default(0);
            $table->double('subtotal')->nullable()->default(0);
            $table->double('total')->nullable()->virtualAs('subtotal + shipping');

            $table->timestamps();
        });
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('product_sub_product_id')->constrained('product_sub_products')->cascadeOnDelete();
            $table->integer('quantity')->nullable()->default(1);
            $table->double('price')->nullable()->default(0);
            $table->double('total')->virtualAs('price * quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
        Schema::dropIfExists('orders');

    }
};
