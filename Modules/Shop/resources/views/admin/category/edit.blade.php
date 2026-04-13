@php
    $currentLocale = app()->getLocale();
    $nameValue = $shop_category->getTranslation('name', $currentLocale, false);
    if (is_array($nameValue)) {
        $nameValue = count($nameValue) ? reset($nameValue) : '';
    }
@endphp

@if(isset($modal) && $modal)
    <!-- Edit Category Modal -->
    <div class="modal fade" id="editCategoryModal{{$shop_category->id}}" tabindex="-1" aria-labelledby="editCategoryModalLabel{{$shop_category->id}}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="{{ route('admin.shop_categories.update', $shop_category->id) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="modal-header">
                        <h5 class="modal-title" id="editCategoryModalLabel{{$shop_category->id}}">{{ __('Edit Category') }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="name" class="form-label">{{ __('Name') }}</label>
                            <input type="text" class="form-control" name="name" value="{{ $nameValue }}" required>
                        </div>
                        <div class="mb-3">
                            <label for="slug" class="form-label">{{ __('Slug') }}</label>
                            <input type="text" class="form-control" name="slug" value="{{$shop_category->slug}}" required readonly>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ __('Close') }}</button>
                        <button type="submit" class="btn btn-primary">{{ __('Save Changes') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@else
    @section('title' , __('Edit Category'))

    @section('toolbar')
        @php
            $breadcrumbItems = [
                ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
                ['label' => 'Shop Categories', 'url' => route('admin.shop_categories.index')],
                ['label' => 'Edit Category'],
            ];
        @endphp
        <x-admin.breadcrumb :pageTitle="__('Edit Category')" :breadcrumbItems="$breadcrumbItems"/>
        <div class="d-flex align-items-center gap-2 gap-lg-3">
        </div>
    @endsection

    @section('js')
    @endsection

    <x-admin-layout>
        <x-admin.create-card title="Edit Category" :formUrl="route('admin.shop_categories.update', $shop_category->id)">
            @method('PUT')
            <div class="row mb-8">
                <div class="col-xl-3">
                    <div class="fs-6 fw-bold mt-2 mb-3">
                        {{ __('Name') }} <span class="text-danger">*</span>
                    </div>
                </div>
                <div class="col-xl-9 fv-row">
                    <input type="text" class="form-control form-control-solid" name="name"
                           value="{{ old('name', $nameValue) }}"
                           required>
                </div>
            </div>

            <div class="row mb-8">
                <div class="col-xl-3">
                    <div class="fs-6 fw-bold mt-2 mb-3">{{ __('Url') }}</div>
                </div>
                <div class="col-xl-9 fv-row">
                    <input type="text" class="form-control form-control-solid" name="slug"
                           value="{{ $shop_category->slug }}" readonly>
                </div>
            </div>
        </x-admin.create-card>
    </x-admin-layout>
@endif











