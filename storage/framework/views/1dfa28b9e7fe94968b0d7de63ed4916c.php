<!DOCTYPE html>
<html lang="<?php echo e(app()->getLocale()); ?>" dir="<?php echo e(app()->getLocale() == 'ar' ? 'rtl' :'ltr'); ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
    <meta name="robots" content="index, follow"/>

    <?php
        $seo = \Modules\Base\Models\Seo::pluck('value', 'key');
        $settings = \Modules\Base\Models\Settings::pluck('value', 'key');
    ?>
    <meta name="author" content="Mutlu">
    <meta name="theme-color" content="#cc3333"/>

    <title inertia><?php echo e($page['props']['meta']['title'] ?? 'Mutlu'); ?></title>
    <meta name="description" content="<?php echo e($page['props']['meta']['description'] ?? $seo->get('website_desc')); ?>">

    <link rel="canonical" href="<?php echo e($page['props']['meta']['canonical'] ?? url()->current()); ?>">

    <meta property="og:title" content="<?php echo e($page['props']['meta']['og']['title'] ?? $seo->get('website_name')); ?>">
    <meta property="og:description"
          content="<?php echo e($page['props']['meta']['og']['description'] ?? $seo->get('website_desc')); ?>">
    <meta property="og:image"
          content="<?php echo e(asset('storage/' . ($page['props']['meta']['og']['image'] ?? $settings->get('meta_img')))); ?>">

    <meta name="twitter:title" content="<?php echo e($page['props']['meta']['twitter']['title'] ?? $seo->get('website_name')); ?>">
    <meta name="twitter:description"
          content="<?php echo e($page['props']['meta']['twitter']['description'] ?? $seo->get('website_desc')); ?>">
    <meta name="twitter:image"
          content="<?php echo e(asset('storage/' . ($page['props']['meta']['twitter']['image'] ?? $settings->get('meta_img')))); ?>">

    <link rel="alternate" hreflang="ar" href="<?php echo e(url('ar')); ?>"/>
    <link rel="alternate" hreflang="tr" href="<?php echo e(url('tr')); ?>"/>
    <link rel="alternate" hreflang="en" href="<?php echo e(url('en')); ?>"/>
    <link rel="alternate" hreflang="x-default" href="<?php echo e(url('/')); ?>"/>

    <link rel="icon" type="image/png" href="<?php echo e(asset('images/favicon/favicon-96x96.png')); ?>" sizes="96x96"/>
    <link rel="icon" type="image/svg+xml" href="<?php echo e(asset('images/favicon/favicon.svg')); ?>"/>
    <link rel="shortcut icon" href="<?php echo e(asset('images/favicon/favicon.ico')); ?>"/>
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo e(asset('images/favicon/apple-touch-icon.png')); ?>"/>

    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.js']); ?>
    <?php echo app('Tighten\Ziggy\BladeRouteGenerator')->generate(); ?>
    <?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->head; } ?>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&family=Yantramanav:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet">


    <!--==============================
	    All CSS File
	============================== -->
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(app()->getLocale() === "ar"): ?>

        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&family=Yantramanav:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
              rel="stylesheet">
        <link rel="stylesheet" href="<?php echo e(asset('site/css/bootstrap.rtl.min.css')); ?>">
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

    <?php else: ?>
        <!-- Bootstrap -->
        <link rel="stylesheet" href="<?php echo e(asset('site/css/bootstrap.min.css')); ?>">
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

    <!-- Fontawesome Icon -->
    <link rel="stylesheet" href="<?php echo e(asset('site/css/fontawesome.min.css')); ?>">
    <!-- Magnific Popup -->
    <link rel="stylesheet" href="<?php echo e(asset('site/css/magnific-popup.min.css')); ?>">
    <!-- Slick Slider -->
    <link rel="stylesheet" href="<?php echo e(asset('site/css/slick.min.css')); ?>">
    <!-- Swiper Slider -->
    <link rel="stylesheet" href="<?php echo e(asset('site/css/swiper-bundle.min.css')); ?>">
    <!-- Theme Custom CSS -->
    <link rel="stylesheet" href="<?php echo e(asset('site/css/style.css')); ?>">

    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(app()->getLocale() === "ar"): ?>
        <link rel="stylesheet" href="<?php echo e(asset('site/css/rtl.css')); ?>">
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

    <?php echo $settings->get('header_scripts'); ?>

</head>
<body>
<?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->body; } elseif (config('inertia.use_script_element_for_initial_page')) { ?><script data-page="app" type="application/json"><?php echo json_encode($page); ?></script><div id="app"></div><?php } else { ?><div id="app" data-page="<?php echo e(json_encode($page)); ?>"></div><?php } ?>

<script src="<?php echo e(asset('site/js/bootstrap.min.js')); ?>"></script>
<script src="<?php echo e(asset('site/js/vendor/jquery-3.6.0.min.js')); ?>"></script>
<!-- Slick Slider -->
<script src="<?php echo e(asset('site/js/slick.min.js')); ?>"></script>
<!-- Range Slider -->
<script src="<?php echo e(asset('site/js/jquery-ui.min.js')); ?>"></script>
<!-- Bootstrap -->
<script src="<?php echo e(asset('site/js/bootstrap.min.js')); ?>"></script>
<!-- Magnific Popup -->
<script src="<?php echo e(asset('site/js/jquery.magnific-popup.min.js')); ?>"></script>
<!-- Counter Up -->
<script src="<?php echo e(asset('site/js/jquery.counterup.min.js')); ?>"></script>
<!-- Marquee -->
<script src="<?php echo e(asset('site/js/jquery.marquee.min.js')); ?>"></script>
<!-- Isotope Filter -->
<script src="<?php echo e(asset('site/js/imagesloaded.pkgd.min.js')); ?>"></script>
<script src="<?php echo e(asset('site/js/isotope.pkgd.min.js')); ?>"></script>

<!-- Swiper Slider -->
<script src="<?php echo e(asset('site/js/swiper-bundle.min.js')); ?>"></script>

<!-- Main Js File -->
<script src="<?php echo e(asset('site/js/main.js')); ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"
        integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "<?php echo e(env('APP_NAME')); ?>",
      "url": "<?php echo e(env('APP_URL')); ?>",
      "logo": "<?php echo e(asset('images/logo.png')); ?>"
    }
</script>
<script>
    <?php if(session('success')): ?>
    toastr.success('<?php echo e(session('success')); ?>');
    <?php elseif(session('error')): ?>
    toastr.error('<?php echo e(session('error')); ?>');
    <?php elseif(session('status')): ?>
    toastr.info('<?php echo e(session('status')); ?>');
    <?php endif; ?>
    <?php if($errors->any()): ?>
    <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    toastr.error('<?php echo e($error); ?>');
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <?php endif; ?>
</script>

<?php echo $settings->get('body_scripts'); ?>

</body>
</html>
<?php /**PATH D:\www\mutlu\resources\views/app.blade.php ENDPATH**/ ?>