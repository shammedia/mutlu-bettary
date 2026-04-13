<?php

namespace Modules\Shop\Repositories\ShopCategory;

use Config;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Log;
use Modules\Core\Traits\ExceptionHandlerTrait;
use Modules\Shop\Models\ShopCategory;

class ShopCategoryModelRepository implements ShopCategoryRepository
{
    use ExceptionHandlerTrait;

    public function all(array $columns = ['*']): LengthAwarePaginator
    {
        return ShopCategory::select($columns)
            ->withCount('products')
            ->latest()
            ->paginate(Config::get('core.page_size', 10));
    }

    public function find(int $id, array $columns = ['*']): ?ShopCategory
    {
        return ShopCategory::find($id, $columns);
    }

    public function store(array $data): mixed
    {
        return $this->execute(function () use ($data) {
            $categoryData = $this->prepareCategoryData($data);
            ShopCategory::create($categoryData);
            session()->flushMessage(true);
        });
    }

    private function prepareCategoryData(array $data): array
    {
        $transName = [app()->getLocale() => $data['name']];
        foreach (otherLangs() as $lang) {
            try {
                $transName[$lang] = autoGoogleTranslator($lang, $data['name']);
            } catch (Exception $e) {
                Log::error($e->getMessage());
            }
        }

        return array_merge($data, [
            'name' => $transName,
        ]);
    }

    /**
     * Prepare category data for update without auto translation.
     * Only the current locale is updated; other locales are preserved.
     */
    private function prepareCategoryUpdateData(array $data, ShopCategory $category): array
    {
        $locale = app()->getLocale();

        $transName = $category->getTranslations('name');
        $transName[$locale] = $data['name'] ?? ($transName[$locale] ?? '');

        return array_merge($data, [
            'name' => $transName,
        ]);
    }

    public function update(array $data, ShopCategory $category): mixed
    {
        return $this->execute(function () use ($data, $category) {
            $categoryData = $this->prepareCategoryUpdateData($data, $category);
            $category->update($categoryData);
            session()->flushMessage(true);

            return true;
        });
    }

    public function deleteMulti(array $ids): ?bool
    {
        return $this->execute(function () use ($ids) {
            ShopCategory::destroy($ids);
            session()->flushMessage(true);

            return true;
        });
    }
}
