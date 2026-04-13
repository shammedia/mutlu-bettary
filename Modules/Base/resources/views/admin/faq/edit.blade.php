@section('title' , __('Edit FAQ'))

@section('toolbar')
    @php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'FAQs', 'url' => route('admin.faqs.index')],
            ['label' => 'Edit FAQ'],
        ];
    @endphp
    <x-admin.breadcrumb :pageTitle="__('Edit FAQ')" :breadcrumbItems="$breadcrumbItems"/>
    <div class="d-flex align-items-center gap-2 gap-lg-3"></div>
@endsection

@section('js')
@endsection

<x-admin-layout>
    <x-admin.create-card title="Edit FAQ" :formUrl="route('admin.faqs.update', $faq->id)">
        @method('PUT')

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">
                    {{ __('Rank') }}
                </div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="number" min="0" class="form-control form-control-solid" name="rank"
                       value="{{ old('rank', $faq->rank) }}" placeholder="{{ __('Rank') }}"/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">
                    <i class="bi bi-translate text-primary mx-1 "></i>{{ __('Question') }}
                    <span class="text-danger">*</span>
                </div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="question"
                       value="{{ old('question', $faq->getTranslation('question', app()->getLocale(), false)) }}"
                       placeholder="{{ __('Question') }}" required/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3">
                    <i class="bi bi-translate text-primary mx-1 "></i>{{ __('Answer') }}
                    <span class="text-danger">*</span>
                </div>
            </div>
            <div class="col-xl-9 fv-row">
                <textarea class="form-control form-control-solid" name="answer" rows="4"
                          placeholder="{{ __('Answer') }}" required>{{ old('answer', $faq->getTranslation('answer', app()->getLocale(), false)) }}</textarea>
            </div>
        </div>
    </x-admin.create-card>
</x-admin-layout>




