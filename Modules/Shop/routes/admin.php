<?php

use Illuminate\Support\Facades\Route;
use Modules\Shop\Http\Controllers\Admin\ProductController;
use Modules\Shop\Http\Controllers\Admin\ShopCategoryController;

Route::middleware('can:Shop Management')->group(function () {
    // You can wrap this group with a permission middleware later if needed, e.g., ->middleware('can:Shop Management')
    Route::delete('shop_categories/deleteMulti', [ShopCategoryController::class, 'deleteMulti'])->name('shop_categories.deleteMulti');
    Route::resource('shop_categories', ShopCategoryController::class)->except(['destroy', 'show']);
    Route::delete('products/deleteMulti', [ProductController::class, 'deleteMulti'])->name('products.deleteMulti');
    Route::resource('products', ProductController::class)->except(['destroy', 'show']);
});
