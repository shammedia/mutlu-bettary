<?php $__env->startSection('title' , __('Staffs')); ?>

<?php $__env->startSection('toolbar'); ?>
    <?php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Staffs'],
        ];
    ?>
    <?php if (isset($component)) { $__componentOriginaldbbc880c47f621cda59b70d6eb356b2f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.breadcrumb','data' => ['pageTitle' => __('Staffs'),'breadcrumbItems' => $breadcrumbItems]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.breadcrumb'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['pageTitle' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(__('Staffs')),'breadcrumbItems' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($breadcrumbItems)]); ?>
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
        <a class="btn btn-sm fw-bold  btn-primary" data-bs-toggle="modal" data-bs-target="#create_modal">
            <?php echo e(__('Add New Staff')); ?> <i class="bi bi-plus-lg mx-1"></i>
        </a>
        <div class="modal fade" tabindex="-1" id="create_modal">
            <?php echo $__env->make('user::admin.staff._create_model', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
        </div>
    </div>
<?php $__env->stopSection(); ?>
<?php $__env->startSection('js'); ?>
    <script>
        $(document).ready(function () {
            $('.delete').on('click', function () {
                let id = $(this).data('id');
                Swal.fire({
                    text: "<?php echo e(__('Are you sure you want to delete it')); ?>",
                    icon: "warning",
                    showCancelButton: !0,
                    buttonsStyling: !1,
                    confirmButtonText: "<?php echo e(__('Yes, Delete!')); ?>",
                    cancelButtonText: "<?php echo e(__('No, Cancel')); ?>",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then((function (e) {
                    makeAjaxRequest('/admin/staffs/' + id, 'DELETE', null, "json", function (res) {
                        if (res.success) {
                            toastr.success('<?php echo e(__('The Operation Done Successfully')); ?>');
                            $('#tr' + id).remove()
                        }

                    })
                }))
            })
        })
    </script>
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
    <?php if (isset($component)) { $__componentOriginal53cf72b3da4b8700c9115c02c0eead10 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal53cf72b3da4b8700c9115c02c0eead10 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.table','data' => ['model' => $model,'search' => 'Search In Staffs']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.table'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['model' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($model),'search' => 'Search In Staffs']); ?>
        <!--begin::Table head-->
        <thead>
        <tr class="text-start text-muted fw-bold fs-7 gs-0">
            <th class="min-w-125px"><?php echo e(__('Name')); ?></th>
            <th class="min-w-125px"><?php echo e(__('Mobile')); ?></th>
            <th class="min-w-125px"><?php echo e(__('Roles')); ?></th>
            <th class="min-w-125px"><?php echo e(__('Last Login')); ?></th>
            <th class="min-w-125px"><?php echo e(__('Created At')); ?></th>
            <th class="text-end min-w-100px"></th>
        </tr>
        </thead>
        <!--end::Table head-->
        <!--begin::Table body-->
        <tbody class="text-gray-600 fw-semibold">
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $model; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $staff): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <tr id="tr<?php echo e($staff->id); ?>">

                <td class="d-flex align-items-center">
                    <!--begin:: Avatar -->
                    <div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
                        <img src="<?php echo e($staff->avatar); ?>" alt="client"/>
                    </div>
                    <!--end::Avatar-->
                    <!--begin::User details-->
                    <div class="d-flex flex-column">
                        <a href="#"
                           class="text-gray-800 mb-1"><?php echo e($staff->name); ?>

                        </a>
                        <a class="text-hover-primary text-gray-500" target="_blank"
                           href="mailto:<?php echo e($staff->email); ?>"><?php echo e($staff->email); ?></a>
                    </div>
                    <!--begin::User details-->
                </td>

                <td>
                    <a href="tel:<?php echo e($staff->mobile); ?>" target="_blank">
                        <?php echo e($staff->mobile); ?>

                    </a>
                </td>

                <td>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $staff->roles; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $role): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <span class="mx-1"> <?php echo e($role->name); ?></span>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </td>

                <td>
                    <div class="badge badge-light fw-bolder">
                        <?php echo e($staff->last_login_human); ?>

                    </div>
                </td>

                <td><?php echo e($staff->created_at); ?></td>

                <td>
                    <a class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#edit_modal<?php echo e($staff->id); ?>">
                        <i class="bi bi-pencil"></i>
                    </a>
                    <div class="modal fade" tabindex="-1" id="edit_modal<?php echo e($staff->id); ?>">
                        <?php echo $__env->make('user::admin.staff._edit_model' , $staff, array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
                    </div>

                    <a class="btn btn-sm btn-danger delete" data-id="<?php echo e($staff->id); ?>">
                        <i class="bi bi-trash"></i>
                    </a>

                </td>

            </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        </tbody>
        <!--end::Table body-->
     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal53cf72b3da4b8700c9115c02c0eead10)): ?>
<?php $attributes = $__attributesOriginal53cf72b3da4b8700c9115c02c0eead10; ?>
<?php unset($__attributesOriginal53cf72b3da4b8700c9115c02c0eead10); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal53cf72b3da4b8700c9115c02c0eead10)): ?>
<?php $component = $__componentOriginal53cf72b3da4b8700c9115c02c0eead10; ?>
<?php unset($__componentOriginal53cf72b3da4b8700c9115c02c0eead10); ?>
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


<?php /**PATH /var/www/vhosts/mutlu-battery.com/httpdocs/Modules/User/resources/views//admin/staff/index.blade.php ENDPATH**/ ?>