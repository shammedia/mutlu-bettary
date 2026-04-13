@section('title' , __('Products'))

@section('toolbar')
    @php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Products'],
        ];
    @endphp
    <x-admin.breadcrumb :pageTitle="__('Products')" :breadcrumbItems="$breadcrumbItems"/>
    <div class="d-flex align-items-center gap-2 gap-lg-3">
        <a class="btn btn-sm fw-bold  btn-primary" href="{{route('admin.products.create')}}">
            {{__('Add New Product')}} <i class="bi bi-plus-lg mx-1"></i>
        </a>
    </div>
@endsection
@section('js')
@endsection
<x-admin-layout>
    <x-admin.table :model="$model" search="Search In Products" :form-url="route('admin.products.deleteMulti')">
        <thead>
        <tr class="text-start text-muted fw-bold fs-7 gs-0">
            <th class="w-10px pe-2" data-orderable="false">
                <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
                    <input class="form-check-input" type="checkbox" data-kt-check="true"
                           data-kt-check-target="#dataTable .form-check-input" value="1"/>
                </div>
            </th>
            <th class="min-w-100px">{{__('Img')}}</th>
            <th class="min-w-50px">{{__('Category')}}<br/>
                {{__('Title')}}</th>
            <th class="min-w-50px">{{__('Featured')}}</th>
            <th class="min-w-50px">{{__('Publish Status')}}</th>
            <th class="min-w-50px">{{__('Created At')}}</th>
            <th class="min-w-50px"><i class="bi bi-eye text-primary fa-2x"></i></th>
            <th class="min-w-50px text-end rounded-end"></th>
        </thead>
        <tbody class="text-gray-600 fw-semibold">
        @foreach($model as $product)
            <tr>
                <td>
                    <div class="form-check form-check-sm form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" name="ids[]" value="{{$product->id}}"/>
                    </div>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <a href="{{$product->image_link}}" target="_blank" >
                            <img src="{{$product->image_link}}" alt="{{$product->title}}" class="img-fluid h-75px"/>
                        </a>
                    </div>
                </td>
                <td>
                      {{$product->category ? $product->category->name : ''}}
                    <h5>
                        <a href="{{route('shop.show' , $product->slug)}}" target="_blank"
                           class=" fw-bolder text-hover-primary mb-1 fs-6">{{$product->title}}</a>
                    </h5>
                </td>
                <td>
                    {{$product->featured ? __('Yes') : __('No') }}
                    @if($product->featured)
                        <i class="bi bi-check-circle-fill text-success"></i>
                    @else
                        <i class="bi bi-x-circle-fill text-danger"></i>
                    @endif
                </td>
                <td>
                    <span
                        class="badge badge-light-{{$product->status == 'Published' ? 'success' : 'warning'}} fs-7 fw-bold">{{__($product->status)}}</span>
                </td>
                <td>
                    {{$product->created_at->diffForHumans() }}
                </td>
                <td>
                    {{$product->visits }}
                </td>
                <td>
                    <a href="{{route('admin.products.edit' , $product->id)}}"
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
</x-admin-layout>











