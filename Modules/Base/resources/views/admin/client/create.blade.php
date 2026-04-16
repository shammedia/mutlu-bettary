@section('title' , __('Add New Client'))

@section('toolbar')
    @php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Clients', 'url' => route('admin.clients.index')],
            ['label' => 'Add New Client'],
        ];
    @endphp
    <x-admin.breadcrumb :pageTitle="__('Add New Client')" :breadcrumbItems="$breadcrumbItems"/>
    <div class="d-flex align-items-center gap-2 gap-lg-3"></div>
@endsection

@section('js')
@endsection

<x-admin-layout>
    <x-admin.create-card title="Add New Client" :formUrl="route('admin.clients.store')">
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">{{ __('Image') }} <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <div class="image-input image-input-outline" data-kt-image-input="true"
                     style="background-image: url('{{ asset('images/default.jpg') }}')">
                    <div class="image-input-wrapper w-500px h-250px bgi-position-center"
                         style="background-size: 75%; background-image: url({{ asset('images/default.jpg') }})"></div>
                    <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                           data-kt-image-input-action="change" data-bs-toggle="tooltip" title="{{ __('Change avatar') }}">
                        <i class="bi bi-pencil-fill fs-7"></i>
                        <input type="file" name="image" accept=".png, .jpg, .jpeg, .gif" required/>
                        <input type="hidden" name="image_remove"/>
                    </label>
                    <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                          data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="{{ __('Cancel avatar') }}">
                        <i class="bi bi-x fs-2"></i>
                    </span>
                    <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                          data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="{{ __('Remove avatar') }}">
                        <i class="bi bi-x fs-2"></i>
                    </span>
                </div>
                <div class="form-text"> 250px * 250px</div>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">
                    <i class="bi bi-translate text-primary mx-1 "></i>{{ __('Name') }}
                    <span class="text-danger">*</span>
                </div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="name"
                       value="{{ old('name') }}" placeholder="{{ __('Name') }}" required/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">
                    <i class="bi bi-link-45deg text-primary mx-1 "></i>{{ __('Link') }}
                </div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="url" class="form-control form-control-solid" name="link"
                       value="{{ old('link') }}" placeholder="{{ __('Link') }}"/>
            </div>
        </div>
    </x-admin.create-card>
</x-admin-layout>




