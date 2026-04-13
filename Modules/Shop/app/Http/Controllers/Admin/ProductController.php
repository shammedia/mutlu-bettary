<?php

namespace Modules\Shop\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Modules\Core\Http\Requests\DeleteMultiRequest;
use Modules\Shop\Models\Product;
use Modules\Shop\Models\ShopCategory;
use Modules\Shop\Repositories\Product\ProductRepository;

class ProductController extends Controller
{
    public function __construct(protected ProductRepository $productRepository)
    {
        $this->setActive('shop');
        $this->setActive('products');
    }

    public function index()
    {
        $model = $this->productRepository->all([
            'id', 'title', 'slug', 'image', 'status', 'featured', 'visits', 'category_id', 'created_at',
        ]);

        return view('shop::admin.product.index', compact('model'));
    }

    public function create()
    {
        $categories = ShopCategory::all();

        return view('shop::admin.product.create', compact('categories'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), []);
        $validator->after(function ($validator) use ($request) {
            $subProducts = $request->input('sub_products', []);
            $subProductFiles = $request->file('sub_products', []);
            $seenCapacities = [];

            foreach ($subProducts as $idx => $row) {
                if (! is_array($row)) {
                    continue;
                }

                $capacity = trim((string) ($row['capacity'] ?? ''));
                if ($capacity !== '') {
                    if (isset($seenCapacities[$capacity])) {
                        $validator->errors()->add("sub_products.$idx.capacity", __('Capacity must be unique.'));
                    } else {
                        $seenCapacities[$capacity] = true;
                    }
                }

                $slidesFiles = $subProductFiles[$idx]['slides'] ?? [];
                if ($slidesFiles && ! is_array($slidesFiles)) {
                    $slidesFiles = [$slidesFiles];
                }

                $hasAnyText =
                    trim((string) ($row['name'] ?? '')) !== '' ||
                    trim((string) ($row['capacity'] ?? '')) !== '' ||
                    trim((string) ($row['voltage'] ?? '')) !== '' ||
                    trim((string) ($row['box'] ?? '')) !== '' ||
                    trim((string) ($row['length'] ?? '')) !== '' ||
                    trim((string) ($row['height'] ?? '')) !== '' ||
                    trim((string) ($row['weight'] ?? '')) !== '';
                    trim((string) ($row['price'] ?? '')) !== '';

                // Ignore fully empty rows
                if (! $hasAnyText && empty($slidesFiles)) {
                    continue;
                }

                if ($capacity === '') {
                    $validator->errors()->add("sub_products.$idx.capacity", __('Capacity is required.'));
                }

                if (empty($slidesFiles)) {
                    $validator->errors()->add("sub_products.$idx.slides", __('Slides image is required.'));
                }
            }
        });
        $validator->validate();

        $subProducts = $request->input('sub_products', []);
        $subProductFiles = $request->file('sub_products', []);
        foreach ($subProducts as $idx => &$row) {
            if (! is_array($row)) {
                continue;
            }
            $slidesFiles = $subProductFiles[$idx]['slides'] ?? [];
            if ($slidesFiles && ! is_array($slidesFiles)) {
                $slidesFiles = [$slidesFiles];
            }
            $row['slides_files'] = $slidesFiles ?: [];
        }

        $data = [
            'title' => $request->input('title'),
            'slug' => $request->input('slug'),
            'description' => $request->input('description'),
            'content' => $request->input('content'),
            'keywords' => $request->input('keywords'),
            'image' => $request->file('img'),
            'status' => $request->has('publish') ? 'Published' : 'Archived',
            'featured' => $request->boolean('featured'),
            'category_id' => $request->input('category_id'),
            'sub_products' => $subProducts,

        ];
        $this->productRepository->store($data);

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product)
    {
        $categories = ShopCategory::all();
        $product->load('subProducts');

        return view('shop::admin.product.edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validator = Validator::make($request->all(), []);
        $validator->after(function ($validator) use ($request, $product) {
            $subProducts = $request->input('sub_products', []);
            $subProductFiles = $request->file('sub_products', []);
            $seenCapacities = [];

            foreach ($subProducts as $idx => $row) {
                if (! is_array($row)) {
                    continue;
                }

                $capacity = trim((string) ($row['capacity'] ?? ''));
                $id = $row['id'] ?? null;

                $slidesFiles = $subProductFiles[$idx]['slides'] ?? [];
                if ($slidesFiles && ! is_array($slidesFiles)) {
                    $slidesFiles = [$slidesFiles];
                }

                $hasAnyText =
                    trim((string) ($row['name'] ?? '')) !== '' ||
                    trim((string) ($row['capacity'] ?? '')) !== '' ||
                    trim((string) ($row['voltage'] ?? '')) !== '' ||
                    trim((string) ($row['box'] ?? '')) !== '' ||
                    trim((string) ($row['length'] ?? '')) !== '' ||
                    trim((string) ($row['height'] ?? '')) !== '' ||
                    trim((string) ($row['weight'] ?? '')) !== '';
                     ($row['price'] ?? 0)!== 0;

                if ($capacity !== '') {
                    if (isset($seenCapacities[$capacity])) {
                        $validator->errors()->add("sub_products.$idx.capacity", __('Capacity must be unique.'));
                    } else {
                        $seenCapacities[$capacity] = true;
                    }

                    $exists = $product->subProducts()
                        ->when($id, fn ($q) => $q->where('id', '!=', $id))
                        ->where('capacity', $capacity)
                        ->exists();

                    if ($exists) {
                        $validator->errors()->add("sub_products.$idx.capacity", __('Capacity must be unique.'));
                    }
                }

                $hasAnyText =
                    trim((string) ($row['name'] ?? '')) !== '' ||
                    trim((string) ($row['capacity'] ?? '')) !== '' ||
                    trim((string) ($row['voltage'] ?? '')) !== '' ||
                    trim((string) ($row['box'] ?? '')) !== '' ||
                    trim((string) ($row['length'] ?? '')) !== '' ||
                    trim((string) ($row['height'] ?? '')) !== '' ||
                    trim((string) ($row['weight'] ?? '')) !== '';
                    ($row['price'] ?? 0) !== 0;

                // Ignore fully empty rows
                if (! $hasAnyText && empty($slidesFiles)) {
                    continue;
                }

                if ($capacity === '') {
                    $validator->errors()->add("sub_products.$idx.capacity", __('Capacity is required.'));
                }

                $hasClear = (bool) ($row['clear_slides'] ?? false);
                $existing = $row['existing_slides'] ?? [];
                if (! is_array($existing)) {
                    $existing = [];
                }

                if ($hasClear) {
                    $existing = [];
                }

                if (count($existing) === 0 && empty($slidesFiles)) {
                    $validator->errors()->add("sub_products.$idx.slides", __('Slides image is required.'));
                }
            }
        });
        $validator->validate();

        $subProducts = $request->input('sub_products', []);
        $subProductFiles = $request->file('sub_products', []);
        foreach ($subProducts as $idx => &$row) {
            if (! is_array($row)) {
                continue;
            }
            $slidesFiles = $subProductFiles[$idx]['slides'] ?? [];
            if ($slidesFiles && ! is_array($slidesFiles)) {
                $slidesFiles = [$slidesFiles];
            }
            $row['slides_files'] = $slidesFiles ?: [];
        }

        $data = [
            'title' => $request->input('title'),
            'slug' => $product->slug,
            'description' => $request->input('description'),
            'content' => $request->input('content'),
            'keywords' => $request->input('keywords'),
            'image' => $request->file('img'),
            'status' => $request->has('publish') ? 'Published' : 'Archived',
            'featured' => $request->boolean('featured'),
            'category_id' => $request->input('category_id'),
            'sub_products' => $subProducts,
        ];
        $this->productRepository->update($data, $product);

        return redirect()->route('admin.products.index');
    }

    public function deleteMulti(DeleteMultiRequest $request): RedirectResponse
    {
        $this->productRepository->deleteMulti($request->input('ids'));

        return back();
    }
}







