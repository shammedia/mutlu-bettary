<?php

namespace Modules\Base\Http\Controllers;

use App\Http\Controllers\Controller;
use Cache;
use Inertia\Inertia;
use Modules\Base\Models\Faq;
use Modules\Cms\Models\Blog;
use Modules\Base\Models\Client;
use Modules\Services\Models\Service;
use Modules\Slides\Models\Slide;
use Modules\Shop\Models\Product;

class HomeController extends Controller {

    public function index() {

        $clients = Cache::rememberForever('clients_home', function () {
            return Client::latest()->take(20)->get(['id', 'image', 'name', 'link', 'created_at']);
        });

        $faqs = Cache::rememberForever('faqs_home', function () {
            return Faq::orderBy('rank')->latest()->take(6)->get(['id', 'question', 'answer', 'rank']);
        });

        $featuredProducts = Cache::rememberForever('featured_products_home', function () {
            return Product::where('status', 'Published')
                ->where('featured', true)
                ->orderBy('created_at', 'desc')
                ->take(12)
                ->get(['id', 'title', 'slug', 'description', 'image', 'featured', 'created_at'])
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'title' => $product->title,
                        'slug' => $product->slug,
                        'description' => $product->description,
                        'featured' => $product->featured,
                        'image_link' => $product->image_link,
                    ];
                });
        });

        return Inertia::render('Base::Index', [
            'clients'  => $clients,
            'faqs'     => $faqs,
            'featuredProducts' => $featuredProducts,
        ]);
    }

    public function aboutUs()
    {
        return Inertia::render('Base::AboutUs');
    }
}
