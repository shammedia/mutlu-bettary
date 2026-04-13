<?php
    $currentLocale = app()->getLocale();
    $nameValue = $shop_category->getTranslation('name', $currentLocale, false);
    if (is_array($nameValue)) {
        $nameValue = count($nameValue) ? reset($nameValue) : '';
    }
?>

<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(isset($modal) && $modal): ?>
    <!-- Edit Category Modal -->
    <div class="modal fade" id="editCategoryModal<?php echo e($shop_category->id); ?>" tabindex="-1" aria-labelledby="editCategoryModalLabel<?php echo e($shop_category->id); ?>" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="<?php echo e(route('admin.shop_categories.update', $shop_category->id)); ?>" method="POST">
                    <?php echo csrf_field(); ?>
                    <?php echo method_field('PUT'); ?>
                    <div class="modal-header">
                        <h5 class="modal-title" id="editCategoryModalLabel<?php echo e($shop_category->id); ?>"><?php echo e(__('Edit Category')); ?></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="name" class="form-label"><?php echo e(__('Name')); ?></label>
                            <input type="text" class="form-control" name="name" value="<?php echo e($nameValue); ?>" required>
                        </div>
                        <div class="mb-3">
                            <label for="slug" class="form-label"><?php echo e(__('Slug')); ?></label>
                            <input type="text" class="form-control" name="slug" value="<?php echo e($shop_category->slug); ?>" required readonly>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><?php echo e(__('Close')); ?></button>
                        <button type="submit" class="btn btn-primary"><?php echo e(__('Save Changes')); ?></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
<?php else: ?>
    <?php $__env->startSection('title' , __('Edit Category')); ?>

    <?php $__env->startSection('toolbar'); ?>
        <?php
            $breadcrumbItems = [
                ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
                ['label' => 'Shop Categories', 'url' => route('admin.shop_categories.index')],
                ['label' => 'Edit Category'],
            ];
        ?>
        <?php if (isset($component)) { $__componentOriginaldbbc880c47f621cda59b70d6eb356b2f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.breadcrumb','data' => ['pageTitle' => __('Edit Category'),'breadcrumbItems' => $breadcrumbItems]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.breadcrumb'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['pageTitle' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(__('Edit Category')),'breadcrumbItems' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($breadcrumbItems)]); ?>
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
        <div class="d-flex align-items-center gap-2 gap-lg-3">
        </div>
    <?php $__env->stopSection(); ?>

    <?php $__env->startSection('js'); ?>
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
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.create-card','data' => ['title' => 'Edit Category','formUrl' => route('admin.shop_categories.update', $shop_category->id)]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.create-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Edit Category','formUrl' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(route('admin.shop_categories.update', $shop_category->id))]); ?>
            <?php echo method_field('PUT'); ?>
            <div class="row mb-8">
                <div class="col-xl-3">
                    <div class="fs-6 fw-bold mt-2 mb-3">
                        <?php echo e(__('Name')); ?> <span class="text-danger">*</span>
                    </div>
                </div>
                <div class="col-xl-9 fv-row">
                    <input type="text" class="form-control form-control-solid" name="name"
                           value="<?php echo e(old('name', $nameValue)); ?>"
                           required>
                </div>
            </div>

            <div class="row mb-8">
                <div class="col-xl-3">
                    <div class="fs-6 fw-bold mt-2 mb-3"><?php echo e(__('Url')); ?></div>
                </div>
                <div class="col-xl-9 fv-row">
                    <input type="text" class="form-control form-control-solid" name="slug"
                           value="<?php echo e($shop_category->slug); ?>" readonly>
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
<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>











<?php /**PATH /var/www/vhosts/mutlu-battery.com/httpdocs/Modules/Shop/resources/views/admin/category/edit.blade.php ENDPATH**/ ?>