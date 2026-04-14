<?php
use Illuminate\Support\Facades\Route;
Route::middleware('can:Support Management')->group(function () {
    Route::get('orders',[\Modules\Order\Http\Controllers\OrderController::class,'all']);
});
