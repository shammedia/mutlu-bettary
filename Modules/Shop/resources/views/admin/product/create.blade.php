@section('title' , __('Add New Product'))

@section('toolbar')
    @php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Products', 'url' => route('admin.products.index')],
            ['label' => 'Add New Product']
        ];
    @endphp
    <x-admin.breadcrumb :pageTitle="__('Add New Product')" :breadcrumbItems="$breadcrumbItems"/>
    <div class="d-flex align-items-center gap-2 gap-lg-3">
    </div>
@endsection
@section('js')
    @include('base::shared._tinymce')
    <script>
        $(document).ready(function (e) {
            var input1 = document.querySelector("#kt_tagify_1");
            new Tagify(input1);

            let subProductIndex = $('#product-sub-products-body tr').length || 0;

            function subProductRowHtml(idx, data) {
                const nameVal = (data && data.name) ? data.name : '';
                const capacityVal = (data && data.capacity) ? data.capacity : '';
                const voltageVal = (data && data.voltage) ? data.voltage : '';
                const boxVal = (data && data.box) ? data.box : '';
                const lengthVal = (data && data.length) ? data.length : '';
                const heightVal = (data && data.height) ? data.height : '';
                const weightVal = (data && data.weight) ? data.weight : '';

                return `
                    <tr>
                        <td>
                            <input type="file" class="form-control form-control-solid" name="sub_products[${idx}][slides][]" accept=".png, .jpg, .jpeg, .webp" multiple>
                            <div class="form-text">{{__('At least one image is required')}}</div>
                        </td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][name]" value="${nameVal}" placeholder="{{__('Name')}}"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][capacity]" value="${capacityVal}" placeholder="{{__('Capacity (Ah)')}}"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][voltage]" value="${voltageVal}" placeholder="{{__('Voltage (V)')}}"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][box]" value="${boxVal}" placeholder="{{__('Box')}}"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][length]" value="${lengthVal}" placeholder="{{__('Length (mm)')}}"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][height]" value="${heightVal}" placeholder="{{__('Height (mm)')}}"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][weight]" value="${weightVal}" placeholder="{{__('Weight (kg)')}}"></td>
                        <td class="text-end"><button type="button" class="btn btn-sm btn-light-danger remove-sub-product-row">{{__('Remove')}}</button></td>
                    </tr>
                `;
            }

            $('#add-sub-product-row').on('click', function () {
                $('#product-sub-products-body').append(subProductRowHtml(subProductIndex++, {}));
            });

            $(document).on('click', '.remove-sub-product-row', function () {
                $(this).closest('tr').remove();
                if ($('#product-sub-products-body tr').length === 0) {
                    $('#product-sub-products-body').append(subProductRowHtml(subProductIndex++, {}));
                }
            });
        });
    </script>
@endsection
<x-admin-layout>
    <x-admin.create-card title="Add New Product" :formUrl="route('admin.products.store')">
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">{{__('Image')}} <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <div class="image-input image-input-outline " data-kt-image-input="true"
                     style="background-image: url('{{asset('images/default.jpg')}}')">
                    <div class="image-input-wrapper w-500px h-250px bgi-position-center"
                         style="background-size: 75%; background-image: url({{asset('images/default.jpg')}})"></div>
                    <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                           data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                        <i class="bi bi-pencil-fill fs-7"></i>
                        <input type="file" name="img" accept=".png, .jpg, .jpeg, .webp" required/>
                        <input type="hidden" name="avatar_remove"/>
                    </label>
                    <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                          data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                        <i class="bi bi-x fs-2"></i>
                    </span>
                    <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                          data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                        <i class="bi bi-x fs-2"></i>
                    </span>
                </div>
                <div class="form-text"> 800px * 600px</div>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">{{__('Category')}} <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <select name="category_id" class="form-control form-control-solid" required>
                    <option value="">{{__('Select Category')}}</option>
                    @foreach($categories as $category)
                        <option value="{{$category->id}}">{{$category->name}}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i>{{__('Title')}}
                    <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="title" value="{{old('title')}}"
                       placeholder="{{__('Title')}}"/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">{{__('Url')}} <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" id="gslug" name="gslug" class="form-control form-control-solid mb-3 mb-lg-0"
                       placeholder="" value="{{old('slug')}}"/>
                <input type="hidden" name="slug" value="{{old('slug')}}" id="slug">
                <div class="my-3" id="link">{{old('slug')}}</div>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i
                        class="bi bi-translate text-primary mx-1 "></i>{{__('Short Description')}} <span
                        class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <p class="text-success fw-bold mb-1">{{__('This Description Very Important For SEO Should Be Between 150-160 characters')}}</p>
                <input type="text" class="form-control form-control-solid" name="description" id="description"
                       value="{{old('description')}}" placeholder="{{__('Short Description')}}..."/>
                <small class="text-muted" id="wordCountDisplay"></small>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i>{{__('Content')}}
                    <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <textarea name="content" class="form-control form-control-solid "
                          id="tinymce">{!! old('content') !!}</textarea>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i>{{__('Keywords')}}
                    <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input class="form-control" value="{{old('keywords' , 'Shop,')}}" name="keywords"
                       id="kt_tagify_1"/>
            </div>
        </div>

        @php
            $subProducts = old('sub_products', []);
        @endphp
        <div class="row mb-8">
            <div class="col-xl-12">
                <div class="fs-6 fw-bold mt-2 mb-3">{{__('Available sizes')}}</div>
            </div>
            <div class="col-xl-12 fv-row">
                <div class="d-flex justify-content-end mb-3">
                    <button type="button" class="btn btn-sm btn-light-primary" id="add-sub-product-row">
                        {{__('Add New Size')}} +
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-3">
                        <thead>
                        <tr class="fw-bold text-muted">
                            <th>{{__('Slides')}}</th>
                            <th>{{__('Name')}}</th>
                            <th>{{__('Capacity (Ah)')}}</th>
                            <th>{{__('Voltage (V)')}}</th>
                            <th>{{__('Box')}}</th>
                            <th>{{__('Length (mm)')}}</th>
                            <th>{{__('Height (mm)')}}</th>
                            <th>{{__('Weight (kg)')}}</th>
                            <th class="text-end">{{__('Actions')}}</th>
                        </tr>
                        </thead>
                        <tbody id="product-sub-products-body">
                        @if(is_array($subProducts) && count($subProducts))
                            @foreach($subProducts as $idx => $sp)
                                <tr>
                                    <td>
                                        <input type="file" class="form-control form-control-solid" name="sub_products[{{$idx}}][slides][]" accept=".png, .jpg, .jpeg, .webp" multiple>
                                        <div class="form-text">{{__('At least one image is required')}}</div>
                                        @error("sub_products.$idx.slides")
                                        <div class="text-danger mt-1">{{ $message }}</div>
                                        @enderror
                                    </td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[{{$idx}}][name]" value="{{ $sp['name'] ?? '' }}" placeholder="{{__('Name')}}"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[{{$idx}}][capacity]" value="{{ $sp['capacity'] ?? '' }}" placeholder="{{__('Capacity (Ah)')}}"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[{{$idx}}][voltage]" value="{{ $sp['voltage'] ?? '' }}" placeholder="{{__('Voltage (V)')}}"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[{{$idx}}][box]" value="{{ $sp['box'] ?? '' }}" placeholder="{{__('Box')}}"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[{{$idx}}][length]" value="{{ $sp['length'] ?? '' }}" placeholder="{{__('Length (mm)')}}"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[{{$idx}}][height]" value="{{ $sp['height'] ?? '' }}" placeholder="{{__('Height (mm)')}}"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[{{$idx}}][weight]" value="{{ $sp['weight'] ?? '' }}" placeholder="{{__('Weight (kg)')}}"></td>
                                    <td class="text-end">
                                        <button type="button" class="btn btn-sm btn-light-danger remove-sub-product-row">{{__('Remove')}}</button>
                                    </td>
                                </tr>
                            @endforeach
                        @else
                            <tr>
                                <td>
                                    <input type="file" class="form-control form-control-solid" name="sub_products[0][slides][]" accept=".png, .jpg, .jpeg, .webp" multiple>
                                    <div class="form-text">{{__('At least one image is required')}}</div>
                                </td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][name]" value="" placeholder="{{__('Name')}}"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][capacity]" value="" placeholder="{{__('Capacity (Ah)')}}"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][voltage]" value="" placeholder="{{__('Voltage (V)')}}"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][box]" value="" placeholder="{{__('Box')}}"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][length]" value="" placeholder="{{__('Length (mm)')}}"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][height]" value="" placeholder="{{__('Height (mm)')}}"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][weight]" value="" placeholder="{{__('Weight (kg)')}}"></td>
                                <td class="text-end">
                                    <button type="button" class="btn btn-sm btn-light-danger remove-sub-product-row">{{__('Remove')}}</button>
                                </td>
                            </tr>
                        @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">{{__('Publish Status')}}</div>
            </div>
            <div class="col-xl-9 fv-row">
                <div class="form-check form-switch form-check-custom form-check-solid me-10">
                    <input class="form-check-input h-30px w-50px"
                           @checked(old('publish') == 'Published') type="checkbox" name="publish"
                           id="flexSwitch30x50"/>
                </div>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">{{__('Featured')}}</div>
            </div>
            <div class="col-xl-9 fv-row">
                <div class="form-check form-switch form-check-custom form-check-solid me-10">
                    <input class="form-check-input h-30px w-50px" @checked(old('featured')) type="checkbox"
                           name="featured"
                           id="flexSwitch30x50"/>
                </div>
            </div>
        </div>

    </x-admin.create-card>
</x-admin-layout>











