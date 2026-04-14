<?php

namespace Modules\Shop\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Modules\Shop\Models\Product;
use Modules\Shop\Models\ShopCategory;

class ShopController extends Controller {
    /**
     * Display a listing of products.
     */
    public function index(Request $request) {
        $query = Product::where('status', 'Published')->with('category');

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = mb_strtolower(trim($request->search), 'UTF-8');
            $locales = array_keys(config('laravellocalization.supportedLocales', ['en' => [], 'ar' => []]));
            $query->where(function ($q) use ($search, $locales) {
                $firstLocale = true;
                foreach ($locales as $loc) {
                    if ($firstLocale) {
                        $q->whereRaw("LOWER(JSON_UNQUOTE(JSON_EXTRACT(title, '$.{$loc}'))) LIKE ?", ["%{$search}%"])
                            ->orWhereRaw("LOWER(JSON_UNQUOTE(JSON_EXTRACT(description, '$.{$loc}'))) LIKE ?", ["%{$search}%"]);
                        $firstLocale = false;
                    } else {
                        $q->orWhereRaw("LOWER(JSON_UNQUOTE(JSON_EXTRACT(title, '$.{$loc}'))) LIKE ?", ["%{$search}%"])
                            ->orWhereRaw("LOWER(JSON_UNQUOTE(JSON_EXTRACT(description, '$.{$loc}'))) LIKE ?", ["%{$search}%"]);
                    }
                }
            });
        }

        // Sorting
        $sort = $request->get('sort', 'default');
        switch ($sort) {
            case 'popular':
                $query->orderBy('visits', 'desc');
                break;
            case 'date':
                $query->orderBy('created_at', 'desc');
                break;
            case 'trending':
                $query->where('featured', true)->orderBy('visits', 'desc');
                break;
            case 'featured':
                $query->where('featured', true)->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }

        $products = $query->paginate(16)->through(function ($product) {
            return [
                'id' => $product->id,
                'title' => $product->title,
                'slug' => $product->slug,
                'description' => $product->description,
                'image_link' => $product->image_link,
                'featured' => $product->featured,
                'category' => $product->category ? [
                    'id' => $product->category->id,
                    'name' => $product->category->name,
                    'slug' => $product->category->slug,
                ] : null,
            ];
        });

        $categories = ShopCategory::withCount(['products' => function ($query) {
            $query->where('status', 'Published');
        }])->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'products_count' => $category->products_count,
            ];
        });

        return Inertia::render('Shop::ShopIndex', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the specified product.
     */
    public function show($slug) {
        $product = Product::where('slug', $slug)
            ->where('status', 'Published')
            ->with(['category', 'subProducts'])
            ->firstOrFail();

        // Increment visits
        if (!session()->has('product_'.$product->id)) {
            $product->increment('visits');
            session()->put('product_'.$product->id, true);
        }

        // Get related products (same category, excluding current)
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', 'Published')
            ->limit(4)
            ->get()
            ->map(function ($relatedProduct) {
                return [
                    'id' => $relatedProduct->id,
                    'title' => $relatedProduct->title,
                    'slug' => $relatedProduct->slug,
                    'description' => $relatedProduct->description,
                    'image_link' => $relatedProduct->image_link,
                    'featured' => $relatedProduct->featured,
                ];
            });

        $toPublicUrl = function (?string $path): ?string {
            if (! $path) {
                return null;
            }

            if (Str::startsWith($path, ['http://', 'https://', '/'])) {
                return $path;
            }

            return asset('storage/'.$path);
        };

        $subProducts = $product->subProducts
            ->sortBy(function ($sp) {
                $raw = trim((string) ($sp->capacity ?? ''));
                return is_numeric($raw) ? (float) $raw : $raw;
            })
            ->values()
            ->map(function ($sp) use ($toPublicUrl) {
                $slides = $sp->slides;
                if (! is_array($slides)) {
                    $slides = $slides ? (array) $slides : [];
                }
                $slides = collect($slides)
                    ->map(fn ($p) => $toPublicUrl(is_string($p) ? $p : null))
                    ->filter()
                    ->values()
                    ->all();

                return [
                    'id' => $sp->id,
                    'name' => $sp->name,
                    'capacity' => $sp->capacity,
                    'voltage' => $sp->voltage,
                    'box' => $sp->box,
                    'length' => $sp->length,
                    'height' => $sp->height,
                    'weight' => $sp->weight,
                    'slides' => $slides,
                    'primary_slide' => $slides[0] ?? null,
                    'price'=>$sp->price
                ];
            });

        return Inertia::render('Shop::ShopShow', [
            'product' => [
                'id' => $product->id,
                'title' => $product->title,
                'slug' => $product->slug,
                'description' => $product->description,
                'keywords' => $product->keywords,
                'content' => $product->content,
                'image_link' => $product->image_link,
                'featured' => $product->featured,
                'category' => $product->category ? [
                    'id' => $product->category->id,
                    'name' => $product->category->name,
                    'slug' => $product->category->slug,
                ] : null,
            ],
            'subProducts' => $subProducts,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
