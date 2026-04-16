<?php

use Illuminate\Support\Facades\Route;
use Modules\Support\app\Http\Controllers\ContactUsController;

Route::get('/contact-us', [ContactUsController::class, 'index'])->name('contact-us');
Route::post('/contact-us', [ContactUsController::class, 'store'])->name('contact-us.Store');
Route::post('/complaint', [ContactUsController::class, 'storeComplaint'])->name('complaint.Store');
Route::post('/subscribe', [ContactUsController::class, 'subscribe'])->name('subscribe');
