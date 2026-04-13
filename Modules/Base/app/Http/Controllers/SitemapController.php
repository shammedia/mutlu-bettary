<?php

namespace Modules\Base\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Modules\Cms\Models\Page;
use Modules\Cms\Models\Blog;
use Modules\Services\Models\Service;
use Modules\Shop\Models\Product;

class SitemapController extends Controller
{
    /**
     * Generate a dynamic XML sitemap.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $locale = App::getLocale();

        $urls = [];

        // Home page
        $urls[] = [
            'loc' => URL::to('/'),
            'lastmod' => now()->toAtomString(),
            'changefreq' => 'daily',
            'priority' => '1.0',
        ];

        // Static "About Us" page
        $urls[] = [
            'loc' => URL::to('/about-us'),
            'lastmod' => now()->toAtomString(),
            'changefreq' => 'monthly',
            'priority' => '0.8',
        ];

        // Static "Contact Us" page
        $urls[] = [
            'loc' => URL::to('/contact-us'),
            'lastmod' => now()->toAtomString(),
            'changefreq' => 'monthly',
            'priority' => '0.8',
        ];


        // Products (shop) if enabled
         try {
             if (class_exists(Product::class)) {
                 Product::select(['slug', 'updated_at'])->where('status', 'Published')->chunk(200, function ($products) use (&$urls) {
                     foreach ($products as $product) {
                         $urls[] = [
                             'loc' => URL::to('/shop/' . $product->slug),
                             'lastmod' => optional($product->updated_at)->toAtomString(),
                             'changefreq' => 'weekly',
                             'priority' => '0.6',
                         ];
                     }
                 });
             }
         } catch (\Throwable $e) {
             // ignore
         }

        $content = view('sitemap', ['urls' => $urls])->render();

        return response($content, 200)
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}


