@section('title' , __('Shop Categories'))

@section('toolbar')
    @php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Shop Categories'],
        ];
    @endphp
    <x-admin.breadcrumb :pageTitle="__('Shop Categories')" :breadcrumbItems="$breadcrumbItems"/>
    <div class="d-flex align-items-center gap-2 gap-lg-3">
        <button class="btn btn-sm fw-bold btn-primary" data-bs-toggle="modal" data-bs-target="#createCategoryModal">
            {{__('Add New Shop Category')}} <i class="bi bi-plus-lg mx-1"></i>
        </button>
    </div>
@endsection
@section('js')
@endsection
<x-admin-layout>
    <x-admin.table :model="$model" search="Search In Shop Categories"
                   :form-url="route('admin.shop_categories.deleteMulti')">
        <thead>
        <tr class="text-start text-muted fw-bold fs-7 gs-0">
            <th class="w-10px pe-2" data-orderable="false">
                <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
                    <input class="form-check-input" type="checkbox" data-kt-check="true"
                           data-kt-check-target="#dataTable .form-check-input" value="1"/>
                </div>
            </th>
            <th class="min-w-100px">{{__('Name')}}</th>
            <th class="min-w-100px">{{__('Url')}}</th>
            <th class="min-w-100px">{{__('Products')}}</th>
            <th class="min-w-100px">{{__('Created At')}}</th>
            <th class="min-w-100px text-end rounded-end"></th>
        </thead>
        <tbody class="text-gray-600 fw-semibold">
        @foreach($model as $category)
            <tr>
                <td>
                    <div class="form-check form-check-sm form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" name="ids[]" value="{{$category->id}}"/>
                    </div>
                </td>
                @php
                    $categoryName = $category->getTranslation('name', app()->getLocale(), false);
                    if (is_array($categoryName)) {
                        $categoryName = count($categoryName) ? reset($categoryName) : '';
                    }
                @endphp
                <td>{{$categoryName}}</td>
                <td>{{$category->slug}}</td>
                <td>{{$category->products_count}}</td>
                <td>{{$category->created_at->diffForHumans() }}</td>
                <td class="text-end">
                    <a href="{{ route('admin.shop_categories.edit', $category->id) }}"
                       class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                        <i class="ki-duotone ki-message-edit fs-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                        </i>
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </x-admin.table>
    @include('shop::admin.category.create', ['modal' => true])
</x-admin-layout>


