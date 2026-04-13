@section('title' , __('Edit Branch'))

@section('toolbar')
    @php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Branches', 'url' => route('admin.branches.index')],
            ['label' => 'Edit Branch'],
        ];
    @endphp
    <x-admin.breadcrumb :pageTitle="__('Edit Branch')" :breadcrumbItems="$breadcrumbItems"/>
    <div class="d-flex align-items-center gap-2 gap-lg-3"></div>
@endsection

<x-admin-layout>
    <x-admin.create-card title="Edit Branch" :formUrl="route('admin.branches.update', $branch->id)">
        @method('PUT')
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i>{{__('Name')}} <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="name" value="{{ old('name', $branch->getTranslation('name', app()->getLocale(), false)) }}" placeholder="{{__('Name')}}"/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i>{{__('City')}} <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="city" value="{{ old('city', $branch->getTranslation('city', app()->getLocale(), false)) }}" placeholder="{{__('City')}}"/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i>{{__('Address')}}</div>
            </div>
            <div class="col-xl-9 fv-row">
                <textarea class="form-control form-control-solid" name="address" rows="3" placeholder="{{__('Address')}}">{{ old('address', $branch->getTranslation('address', app()->getLocale(), false)) }}</textarea>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-telephone text-primary mx-1 "></i>{{__('Phone')}}</div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="phone" value="{{ old('phone', $branch->getTranslation('phone', app()->getLocale(), false)) }}" placeholder="{{__('Phone')}}"/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-geo-alt text-primary mx-1"></i>{{__('Location (Lat/Lng)')}}</div>
            </div>
            <div class="col-xl-9 fv-row">
                <div class="row g-3">
                    <div class="col-md-6">
                        <input type="text" inputmode="decimal" dir="ltr" class="form-control form-control-solid" name="lat" value="{{ old('lat', $branch->lat) }}" placeholder="{{__('Latitude')}} (e.g. 33.51075165957761)"/>
                    </div>
                    <div class="col-md-6">
                        <input type="text" inputmode="decimal" dir="ltr" class="form-control form-control-solid" name="lng" value="{{ old('lng', $branch->lng) }}" placeholder="{{__('Longitude')}} (e.g. 36.27652712345678)"/>
                    </div>
                </div>
                <div class="form-text">{{__('Used for the Branch Locator map pins on the Contact page.')}}</div>
            </div>
        </div>
    </x-admin.create-card>
</x-admin-layout>



