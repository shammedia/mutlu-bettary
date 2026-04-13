<?php

namespace Modules\Shop\Repositories\ShopCategory;

use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Shop\Models\ShopCategory;

interface ShopCategoryRepository
{
    public function all(array $columns = ['*']): LengthAwarePaginator;

    public function find(int $id, array $columns = ['*']): ?ShopCategory;

    public function store(array $data): mixed;

    public function update(array $data, ShopCategory $category): mixed;

    public function deleteMulti(array $ids): ?bool;
}
