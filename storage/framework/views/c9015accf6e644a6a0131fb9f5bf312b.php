<?php $__env->startSection('title' , __('Edit Branch')); ?>

<?php $__env->startSection('toolbar'); ?>
    <?php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Branches', 'url' => route('admin.branches.index')],
            ['label' => 'Edit Branch'],
        ];
    ?>
    <?php if (isset($component)) { $__componentOriginaldbbc880c47f621cda59b70d6eb356b2f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.breadcrumb','data' => ['pageTitle' => __('Edit Branch'),'breadcrumbItems' => $breadcrumbItems]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.breadcrumb'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['pageTitle' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(__('Edit Branch')),'breadcrumbItems' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($breadcrumbItems)]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f)): ?>
<?php $attributes = $__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f; ?>
<?php unset($__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f); ?>
<?php endif; ?>
<?php if (isset($__componentOriginaldbbc880c47f621cda59b70d6eb356b2f)): ?>
<?php $component = $__componentOriginaldbbc880c47f621cda59b70d6eb356b2f; ?>
<?php unset($__componentOriginaldbbc880c47f621cda59b70d6eb356b2f); ?>
<?php endif; ?>
    <div class="d-flex align-items-center gap-2 gap-lg-3"></div>
<?php $__env->stopSection(); ?>

<?php if (isset($component)) { $__componentOriginal91fdd17964e43374ae18c674f95cdaa3 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal91fdd17964e43374ae18c674f95cdaa3 = $attributes; } ?>
<?php $component = App\View\Components\AdminLayout::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin-layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\AdminLayout::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
    <?php if (isset($component)) { $__componentOriginal6dd53ea036ef0ad42242489cd935340d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal6dd53ea036ef0ad42242489cd935340d = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.create-card','data' => ['title' => 'Edit Branch','formUrl' => route('admin.branches.update', $branch->id)]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.create-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Edit Branch','formUrl' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(route('admin.branches.update', $branch->id))]); ?>
        <?php echo method_field('PUT'); ?>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i><?php echo e(__('Name')); ?> <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="name" value="<?php echo e(old('name', $branch->getTranslation('name', app()->getLocale(), false))); ?>" placeholder="<?php echo e(__('Name')); ?>"/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i><?php echo e(__('City')); ?> <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="city" value="<?php echo e(old('city', $branch->getTranslation('city', app()->getLocale(), false))); ?>" placeholder="<?php echo e(__('City')); ?>"/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i><?php echo e(__('Address')); ?></div>
            </div>
            <div class="col-xl-9 fv-row">
                <textarea class="form-control form-control-solid" name="address" rows="3" placeholder="<?php echo e(__('Address')); ?>"><?php echo e(old('address', $branch->getTranslation('address', app()->getLocale(), false))); ?></textarea>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-telephone text-primary mx-1 "></i><?php echo e(__('Phone')); ?></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="phone" value="<?php echo e(old('phone', $branch->getTranslation('phone', app()->getLocale(), false))); ?>" placeholder="<?php echo e(__('Phone')); ?>"/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-geo-alt text-primary mx-1"></i><?php echo e(__('Location (Lat/Lng)')); ?></div>
            </div>
            <div class="col-xl-9 fv-row">
                <div class="row g-3">
                    <div class="col-md-6">
                        <input type="text" inputmode="decimal" dir="ltr" class="form-control form-control-solid" name="lat" value="<?php echo e(old('lat', $branch->lat)); ?>" placeholder="<?php echo e(__('Latitude')); ?> (e.g. 33.51075165957761)"/>
                    </div>
                    <div class="col-md-6">
                        <input type="text" inputmode="decimal" dir="ltr" class="form-control form-control-solid" name="lng" value="<?php echo e(old('lng', $branch->lng)); ?>" placeholder="<?php echo e(__('Longitude')); ?> (e.g. 36.27652712345678)"/>
                    </div>
                </div>
                <div class="form-text"><?php echo e(__('Used for the Branch Locator map pins on the Contact page.')); ?></div>
            </div>
        </div>
     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal6dd53ea036ef0ad42242489cd935340d)): ?>
<?php $attributes = $__attributesOriginal6dd53ea036ef0ad42242489cd935340d; ?>
<?php unset($__attributesOriginal6dd53ea036ef0ad42242489cd935340d); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal6dd53ea036ef0ad42242489cd935340d)): ?>
<?php $component = $__componentOriginal6dd53ea036ef0ad42242489cd935340d; ?>
<?php unset($__componentOriginal6dd53ea036ef0ad42242489cd935340d); ?>
<?php endif; ?>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal91fdd17964e43374ae18c674f95cdaa3)): ?>
<?php $attributes = $__attributesOriginal91fdd17964e43374ae18c674f95cdaa3; ?>
<?php unset($__attributesOriginal91fdd17964e43374ae18c674f95cdaa3); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal91fdd17964e43374ae18c674f95cdaa3)): ?>
<?php $component = $__componentOriginal91fdd17964e43374ae18c674f95cdaa3; ?>
<?php unset($__componentOriginal91fdd17964e43374ae18c674f95cdaa3); ?>
<?php endif; ?>



<?php /**PATH /var/www/vhosts/mutlu-battery.com/httpdocs/Modules/Base/resources/views/admin/branch/edit.blade.php ENDPATH**/ ?>