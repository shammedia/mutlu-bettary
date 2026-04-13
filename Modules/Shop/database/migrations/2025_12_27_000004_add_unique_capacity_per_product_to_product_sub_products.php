<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_sub_products', function (Blueprint $table) {
            $table->unique(['product_id', 'capacity'], 'psp_product_id_capacity_unique');
        });
    }

    public function down(): void
    {
        Schema::table('product_sub_products', function (Blueprint $table) {
            $table->dropUnique('psp_product_id_capacity_unique');
        });
    }
};








