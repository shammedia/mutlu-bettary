<?php

namespace Modules\Shop\Repositories\Product;

use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Shop\Models\Product;

interface ProductRepository
{
    public function all(array $columns = ['*']): LengthAwarePaginator;

    public function find(int $id, array $columns = ['*']): ?Product;

    public function store(array $data): mixed;

    public function update(array $data, Product $product): mixed;

    public function deleteMulti(array $ids): ?bool;
}







