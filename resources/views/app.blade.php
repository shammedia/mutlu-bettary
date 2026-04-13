<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{app()->getLocale() == 'ar' ? 'rtl' :'ltr'}}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="index, follow"/>

    @php
        $seo = \Modules\Base\Models\Seo::pluck('value', 'key');
        $settings = \Modules\Base\Models\Settings::pluck('value', 'key');
    @endphp
    <meta name="author" content="Mutlu">
    <meta name="theme-color" content="#cc3333"/>

    <title inertia>{{ $page['props']['meta']['title'] ?? 'Mutlu' }}</title>
    <meta name="description" content="{{ $page['props']['meta']['description'] ?? $seo->get('website_desc') }}">

    <link rel="canonical" href="{{ $page['props']['meta']['canonical'] ?? url()->current() }}">

    <meta property="og:title" content="{{ $page['props']['meta']['og']['title'] ?? $seo->get('website_name') }}">
    <meta property="og:description"
          content="{{ $page['props']['meta']['og']['description'] ?? $seo->get('website_desc') }}">
    <meta property="og:image"
          content="{{ asset('storage/' . ($page['props']['meta']['og']['image'] ?? $settings->get('meta_img'))) }}">

    <meta name="twitter:title" content="{{ $page['props']['meta']['twitter']['title'] ?? $seo->get('website_name') }}">
    <meta name="twitter:description"
          content="{{ $page['props']['meta']['twitter']['description'] ?? $seo->get('website_desc') }}">
    <meta name="twitter:image"
          content="{{ asset('storage/' . ($page['props']['meta']['twitter']['image'] ?? $settings->get('meta_img'))) }}">

    <link rel="alternate" hreflang="ar" href="{{ url('ar') }}"/>
    <link rel="alternate" hreflang="tr" href="{{ url('tr') }}"/>
    <link rel="alternate" hreflang="en" href="{{ url('en') }}"/>
    <link rel="alternate" hreflang="x-default" href="{{ url('/') }}"/>

    <link rel="icon" type="image/png" href="{{ asset('images/favicon/favicon-96x96.png') }}" sizes="96x96"/>
    <link rel="icon" type="image/svg+xml" href="{{ asset('images/favicon/favicon.svg') }}"/>
    <link rel="shortcut icon" href="{{ asset('images/favicon/favicon.ico') }}"/>
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/favicon/apple-touch-icon.png') }}"/>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @routes
    @inertiaHead

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&family=Yantramanav:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet">


    <!--==============================
	    All CSS File
	============================== -->
    @if(app()->getLocale() === "ar")

        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&family=Yantramanav:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
              rel="stylesheet">
        <link rel="stylesheet" href="{{asset('site/css/bootstrap.rtl.min.css')}}">
        <style>
            html, body, .modal .modal-header h1, .modal .modal-header .h1, .modal .modal-header h2,
            .modal .modal-header .h2, .modal .modal-header h3, .modal .modal-header .h3, .modal .modal-header h4,
            .modal .modal-header .h4, .modal .modal-header h5, .modal .modal-header .h5, .modal .modal-header h6, .modal .modal-header .h6 {
                font-family: 'Tajawal', sans-serif !important;
                line-height: 1.8;
            }

            :root {
                --title-font: 'Tajawal', sans-serif !important;
                --body-font: 'Tajawal', sans-serif !important;

            }
        </style>

    @else
        <!-- Bootstrap -->
        <link rel="stylesheet" href="{{asset('site/css/bootstrap.min.css')}}">
    @endif

    <!-- Fontawesome Icon -->
    <link rel="stylesheet" href="{{asset('site/css/fontawesome.min.css')}}">
    <!-- Magnific Popup -->
    <link rel="stylesheet" href="{{asset('site/css/magnific-popup.min.css')}}">
    <!-- Slick Slider -->
    <link rel="stylesheet" href="{{asset('site/css/slick.min.css')}}">
    <!-- Swiper Slider -->
    <link rel="stylesheet" href="{{asset('site/css/swiper-bundle.min.css')}}">
    <!-- Theme Custom CSS -->
    <link rel="stylesheet" href="{{asset('site/css/style.css')}}">

    @if(app()->getLocale() === "ar")
        <link rel="stylesheet" href="{{asset('site/css/rtl.css')}}">
    @endif

    {!! $settings->get('header_scripts') !!}
</head>
<body>
@inertia

<script src="{{asset('site/js/bootstrap.min.js')}}"></script>
<script src="{{asset('site/js/vendor/jquery-3.6.0.min.js')}}"></script>
<!-- Slick Slider -->
<script src="{{asset('site/js/slick.min.js')}}"></script>
<!-- Range Slider -->
<script src="{{asset('site/js/jquery-ui.min.js')}}"></script>
<!-- Bootstrap -->
<script src="{{asset('site/js/bootstrap.min.js')}}"></script>
<!-- Magnific Popup -->
<script src="{{asset('site/js/jquery.magnific-popup.min.js')}}"></script>
<!-- Counter Up -->
<script src="{{asset('site/js/jquery.counterup.min.js')}}"></script>
<!-- Marquee -->
<script src="{{asset('site/js/jquery.marquee.min.js')}}"></script>
<!-- Isotope Filter -->
<script src="{{asset('site/js/imagesloaded.pkgd.min.js')}}"></script>
<script src="{{asset('site/js/isotope.pkgd.min.js')}}"></script>

<!-- Swiper Slider -->
<script src="{{asset('site/js/swiper-bundle.min.js')}}"></script>

<!-- Main Js File -->
<script src="{{asset('site/js/main.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"
        integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "{{env('APP_NAME')}}",
      "url": "{{env('APP_URL')}}",
      "logo": "{{asset('images/logo.png')}}"
    }
</script>
<script>
    @if (session('success'))
    toastr.success('{{ session('success') }}');
    @elseif (session('error'))
    toastr.error('{{ session('error') }}');
    @elseif(session('status'))
    toastr.info('{{ session('status') }}');
    @endif
    @if ($errors->any())
    @foreach ($errors->all() as $error)
    toastr.error('{{ $error }}');
    @endforeach
    @endif
</script>

{!! $settings->get('body_scripts') !!}
</body>
</html>
