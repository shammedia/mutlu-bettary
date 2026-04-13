<?php

use Illuminate\Support\Facades\Route;
use Modules\Base\Http\Controllers\HomeController;
use Modules\Base\Http\Controllers\SitemapController;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Static "About Us" page (content comes from shared SEO/settings)
Route::get('/about-us', [HomeController::class, 'aboutUs'])->name('about-us');

// Dynamic sitemap.xml
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
