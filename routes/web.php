<?php

use App\Http\Controllers\BotManController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application.
|
*/

Route::match(['get', 'post'], '/botman', [BotManController::class, 'handle'])
    ->withoutMiddleware(VerifyCsrfToken::class)
    ->name('botman.handle');

// Optional page that can host the widget iframe (used by frameEndpoint if desired).
Route::get('/chatbot', [BotManController::class, 'widget'])->name('chatbot.widget');

