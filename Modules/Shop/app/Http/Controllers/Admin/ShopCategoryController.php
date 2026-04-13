<?php

namespace Modules\Shop\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Modules\Core\Http\Requests\DeleteMultiRequest;
use Modules\Shop\Models\ShopCategory;
use Modules\Shop\Repositories\ShopCategory\ShopCategoryRepository;

class ShopCategoryController extends Controller
{
    protected ShopCategoryRepository $categoryRepository;

    public function __construct(ShopCategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
        $this->setActive('shop');
        $this->setActive('shop_categories');
    }

    public function index()
    {
        $model = $this->categoryRepository->all(['id', 'name', 'slug', 'created_at']);

        return view('shop::admin.category.index', compact('model'));
    }

    public function create()
    {
        return view('shop::admin.category.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = [
            'name' => $request->input('name'),
            'slug' => $request->input('slug'),
        ];
        $this->categoryRepository->store($data);

        return redirect()->route('admin.shop_categories.index');
    }

    public function edit(ShopCategory $shop_category)
    {
        return view('shop::admin.category.edit', compact('shop_category'));
    }

    public function update(Request $request, ShopCategory $shop_category): RedirectResponse
    {
        $data = [
            'name' => $request->input('name'),
            'slug' => $shop_category->slug,
        ];
        $this->categoryRepository->update($data, $shop_category);

        return redirect()->route('admin.shop_categories.index');
    }

    public function deleteMulti(DeleteMultiRequest $request): RedirectResponse
    {
        $this->categoryRepository->deleteMulti($request->input('ids'));

        return back();
    }
}
