<?php
use Illuminate\Support\Facades\Route;
Route::middleware('can:Support Management')->group(function () {
    Route::get('orders',[\Modules\Order\Http\Controllers\OrderController::class,'all'])->name('orders.all');
    Route::get('orders/{id}/show',[\Modules\Order\Http\Controllers\OrderController::class,'show'])->name('orders.show');
    Route::put('orders/{id}/update',[\Modules\Order\Http\Controllers\OrderController::class,'update'])->name('orders.update');
    Route::delete('orders/{id}/delete',[\Modules\Order\Http\Controllers\OrderController::class,'destroy'])->name('orders.destroy');
});
