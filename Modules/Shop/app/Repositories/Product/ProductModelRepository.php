<?php

namespace Modules\Shop\Repositories\Product;

use Config;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Log;
use Modules\Core\Traits\ExceptionHandlerTrait;
use Modules\Core\Traits\FileTrait;
use Modules\Shop\Models\Product;
use Modules\Shop\Models\SubProduct;

class ProductModelRepository implements ProductRepository {
    use ExceptionHandlerTrait, FileTrait;

    private string $uploadPath = 'products';

    public function all(array $columns = ['*']): LengthAwarePaginator {
        return Product::select($columns)
            ->latest()
            ->paginate(Config::get('core.page_size', 10));
    }

    public function find(int $id, array $columns = ['*']): ?Product {
        return Product::find($id, $columns);
    }

    public function store(array $data): mixed {
        return $this->execute(function () use ($data) {
            $productData = $this->prepareProductData($data);
            $product = Product::create($productData);
            $this->syncSubProducts($product, $data['sub_products'] ?? []);
            session()->flushMessage(true);
            cache()->forget('featured_products_home');
            return $product;
        });
    }

    private function prepareProductData(array $data, ?string $existingImage = null): array {
        $path = $this->handleImageUpload($data, $existingImage);
        $keywords = $this->parseKeywords($data['keywords'] ?? '');

        $transTitle = [app()->getLocale() => $data['title']];
        $transDesc = [app()->getLocale() => $data['description'] ?? ''];
        $transKeywords = [app()->getLocale() => $keywords];
        $transContent = [app()->getLocale() => $data['content'] ?? ''];
        foreach (otherLangs() as $lang) {
            try {
                $transTitle[$lang] = autoGoogleTranslator($lang, $data['title'] ?? '');
                $transDesc[$lang] = autoGoogleTranslator($lang, $data['description'] ?? '');
                $transKeywords[$lang] = autoGoogleTranslator($lang, $keywords ?? '');
                $transContent[$lang] = autoGoogleTranslator($lang, $data['content'] ?? '');
            } catch (Exception $e) {
                Log::error($e->getMessage());
            }
        }

        return array_merge($data, [
            'image' => $path,
            'title' => $transTitle,
            'description' => $transDesc,
            'content' => $transContent,
            'keywords' => $transKeywords,
            'status' => $data['status'],
            'featured' => (int) ($data['featured'] ?? false),
        ]);
    }

    /**
     * Prepare product data for update without auto translation.
     * Only the current locale is updated; other locales are preserved.
     */
    private function prepareProductUpdateData(array $data, Product $product): array {
        $path = $this->handleImageUpload($data, $product->image);
        $keywords = $this->parseKeywords($data['keywords'] ?? '');

        $locale = app()->getLocale();

        $transTitle = $product->getTranslations('title');
        $transDesc = $product->getTranslations('description');
        $transKeywords = $product->getTranslations('keywords');
        $transContent = $product->getTranslations('content');

        $transTitle[$locale] = $data['title'] ?? ($transTitle[$locale] ?? '');
        $transDesc[$locale] = $data['description'] ?? ($transDesc[$locale] ?? '');
        $transKeywords[$locale] = $keywords ?? ($transKeywords[$locale] ?? '');
        $transContent[$locale] = $data['content'] ?? ($transContent[$locale] ?? '');

        return array_merge($data, [
            'image' => $path,
            'title' => $transTitle,
            'description' => $transDesc,
            'content' => $transContent,
            'keywords' => $transKeywords,
            'status' => $data['status'],
            'featured' => (int) ($data['featured'] ?? $product->featured),
        ]);
    }

    private function handleImageUpload(array $data, ?string $existingImage = null): ?string {
        return $data['image']
            ? $this->upload($data['image'], $this->uploadPath, $data['slug'], $existingImage)
            : $existingImage;
    }

    private function parseKeywords(?string $keywordsInput): string {
        if (!$keywordsInput) {
            return '';
        }
        $decoded = json_decode($keywordsInput, true);

        return $decoded ? implode(', ', array_column($decoded, 'value')) : '';
    }

    public function update(array $data, Product $product): mixed {
        return $this->execute(function () use ($data, $product) {
            $productData = $this->prepareProductUpdateData($data, $product);
            $product->update($productData);
            $this->syncSubProducts($product, $data['sub_products'] ?? []);
            session()->flushMessage(true);
            cache()->forget('featured_products_home');
            return true;
        });
    }

    private function syncSubProducts(Product $product, array $subProducts): void {
        $uploadDir = $this->uploadPath.'/sub-products';

        $normalized = [];
        foreach ($subProducts as $item) {
            if (!is_array($item)) {
                continue;
            }

            $name = trim((string) ($item['name'] ?? ''));
            $capacity = trim((string) ($item['capacity'] ?? ''));
            $voltage = trim((string) ($item['voltage'] ?? ''));
            $box = trim((string) ($item['box'] ?? ''));
            $length = trim((string) ($item['length'] ?? ''));
            $height = trim((string) ($item['height'] ?? ''));
            $weight = trim((string) ($item['weight'] ?? ''));
            $price=$item['price']??0;
            $clearSlides = (bool) ($item['clear_slides'] ?? false);
            $slidesFiles = $item['slides_files'] ?? [];
            if ($slidesFiles && !is_array($slidesFiles)) {
                $slidesFiles = [$slidesFiles];
            }

            // ignore empty rows
            if (
                $name === '' &&
                $capacity === '' &&
                $voltage === '' &&
                $box === '' &&
                $length === '' &&
                $height === '' &&
                $weight === '' &&
                empty($slidesFiles)
            ) {
                continue;
            }

            $normalized[] = [
                '_idx' => count($normalized),
                'id' => $item['id'] ?? null,
                'name' => $name,
                'capacity' => $capacity,
                'voltage' => $voltage ?: null,
                'box' => $box ?: null,
                'length' => $length ?: null,
                'height' => $height ?: null,
                'weight' => $weight ?: null,
                'price'=>$price,
                'clear_slides' => $clearSlides,
                'slides_files' => $slidesFiles ?: [],
            ];
        }

        $keptIds = [];
        foreach ($normalized as $item) {
            $slides = [];

            $payload = [
                'product_id' => $product->id,
                'name' => $item['name'] ?? '',
                'capacity' => $item['capacity'] ?? '',
                'voltage' => $item['voltage'] ?? null,
                'box' => $item['box'] ?? null,
                'length' => $item['length'] ?? null,
                'height' => $item['height'] ?? null,
                'weight' => $item['weight'] ?? null,
                'price'=>$item['price'],
            ];

            $id = $item['id'] ?? null;
            if ($id) {
                $subProduct = $product->subProducts()->whereKey($id)->first();
                if ($subProduct) {
                    $existingSlides = $subProduct->slides;
                    if (!is_array($existingSlides)) {
                        $existingSlides = $existingSlides ? (array) $existingSlides : [];
                    }

                    if ((bool) ($item['clear_slides'] ?? false)) {
                        foreach ($existingSlides as $oldPath) {
                            if ($oldPath) {
                                $this->deleteFile($oldPath);
                            }
                        }
                        $existingSlides = [];
                    }

                    $uploadedSlides = $this->uploadSubProductSlides(
                        $item['slides_files'] ?? [],
                        $uploadDir,
                        $product->slug,
                        $item['name'] ?? null,
                        (int) ($item['_idx'] ?? 0)
                    );

                    $slides = array_values(array_filter(array_merge($existingSlides, $uploadedSlides)));
                    $payload['slides'] = $slides;

                    $subProduct->update($payload);
                    $keptIds[] = (int) $subProduct->id;
                    continue;
                }
            }

            $uploadedSlides = $this->uploadSubProductSlides(
                $item['slides_files'] ?? [],
                $uploadDir,
                $product->slug,
                $item['name'] ?? null,
                (int) ($item['_idx'] ?? 0)
            );
            $payload['slides'] = array_values(array_filter($uploadedSlides));

            $subProduct = SubProduct::create($payload);
            $keptIds[] = (int) $subProduct->id;
        }

        if (count($keptIds) > 0) {
            $toDelete = $product->subProducts()->whereNotIn('id', $keptIds)->get();
            foreach ($toDelete as $sp) {
                $slides = $sp->slides;
                if (is_array($slides)) {
                    foreach ($slides as $path) {
                        if ($path) {
                            $this->deleteFile($path);
                        }
                    }
                }
            }
            $product->subProducts()->whereNotIn('id', $keptIds)->delete();
        } else {
            $toDelete = $product->subProducts()->get();
            foreach ($toDelete as $sp) {
                $slides = $sp->slides;
                if (is_array($slides)) {
                    foreach ($slides as $path) {
                        if ($path) {
                            $this->deleteFile($path);
                        }
                    }
                }
            }
            $product->subProducts()->delete();
        }
    }

    /**
     * @param  array<int, mixed>  $files
     * @return array<int, string>
     */
    private function uploadSubProductSlides(array $files, string $dir, ?string $productSlug, ?string $name, int $idx): array {
        $uploaded = [];
        foreach ($files as $file) {
            if (!$file) {
                continue;
            }

            $base = trim((string) ($productSlug ?: 'product'));
            $suffix = Str::slug((string) ($name ?: 'sub-product'));
            $filename = $base.'-'.$suffix.'-'.$idx.'-'.Str::random(6);

            $path = $this->upload($file, $dir, $filename);
            if ($path) {
                $uploaded[] = $path;
            }
        }

        return $uploaded;
    }

    public function deleteMulti(array $ids): ?bool {
        return $this->execute(function () use ($ids) {
            $images = Product::whereIn('id', $ids)->pluck('image')->filter()->toArray();
            Product::destroy($ids);
            foreach ($images as $image) {
                $this->deleteFile($image);
            }
            session()->flushMessage(true);
            cache()->forget('featured_products_home');
            return true;
        });
    }
}







