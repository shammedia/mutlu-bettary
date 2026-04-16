<?php $__env->startSection('title' , __('Roles')); ?>

<?php $__env->startSection('toolbar'); ?>
    <?php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Roles'],
        ];
    ?>
    <?php if (isset($component)) { $__componentOriginaldbbc880c47f621cda59b70d6eb356b2f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.breadcrumb','data' => ['pageTitle' => __('Roles'),'breadcrumbItems' => $breadcrumbItems]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.breadcrumb'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['pageTitle' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(__('Roles')),'breadcrumbItems' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($breadcrumbItems)]); ?>
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
<?php $__env->startSection('js'); ?>
    <script>
        var KTUsersAddRole = function () {
            const t = document.getElementById("kt_modal_add_role"),
                e = t.querySelector("#kt_modal_add_role_form"),
                n = new bootstrap.Modal(t);
            return {
                init: function () {
                    (() => {
                        var o = FormValidation.formValidation(e, {
                            fields: {
                                role_name: {
                                    validators: {
                                        notEmpty: {
                                            message: "<?php echo e(__('The role name is required')); ?>"
                                        }
                                    }
                                }
                            },
                            plugins: {
                                trigger: new FormValidation.plugins.Trigger,
                                bootstrap: new FormValidation.plugins.Bootstrap5({
                                    rowSelector: ".fv-row",
                                    eleInvalidClass: "",
                                    eleValidClass: ""
                                })
                            }
                        });
                        t.querySelector('[data-kt-roles-modal-action="close"]').addEventListener("click", (t => {
                            t.preventDefault(), Swal.fire({
                                text: "<?php echo e(__('Are you sure you would like to close?')); ?>",
                                icon: "warning",
                                showCancelButton: !0,
                                buttonsStyling: !1,
                                confirmButtonText: "<?php echo e(__('Yes')); ?>",
                                cancelButtonText: "<?php echo e(__('No, Cancel')); ?>",
                                customClass: {
                                    confirmButton: "btn btn-primary",
                                    cancelButton: "btn btn-active-light"
                                }
                            }).then((function (t) {
                                t.value && n.hide()
                            }))
                        })), t.querySelector('[data-kt-roles-modal-action="cancel"]').addEventListener("click", (t => {
                            t.preventDefault(), Swal.fire({
                                text: "<?php echo e(__('Are you sure you would like to cancel?')); ?>",
                                icon: "warning",
                                showCancelButton: !0,
                                buttonsStyling: !1,
                                confirmButtonText: "<?php echo e(__('Yes')); ?>",
                                cancelButtonText: "<?php echo e(__('No')); ?>",
                                customClass: {
                                    confirmButton: "btn btn-primary",
                                    cancelButton: "btn btn-active-light"
                                }
                            }).then((function (t) {
                                t.value && n.hide()
                            }))
                        }));
                        const r = t.querySelector('[data-kt-roles-modal-action="submit"]');
                        r.addEventListener("click", (function (t) {
                            t.preventDefault(), o && o.validate().then((function (t) {
                                "Valid" == t ? (r.setAttribute("data-kt-indicator", "on"), r.disabled = !0, setTimeout((function () {
                                    r.removeAttribute("data-kt-indicator"), r.disabled = !1, Swal.fire({
                                        text: "<?php echo e(__('Form has been successfully submitted!')); ?>",
                                        icon: "success",
                                        buttonsStyling: !1,
                                        confirmButtonText: "<?php echo e(__('Ok, Go It')); ?>",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then((function (t) {
                                        t.isConfirmed && n.hide();
                                        $('#kt_modal_add_role_form').submit();
                                    }))
                                }), 2e3)) : Swal.fire({
                                    text: "<?php echo e(__('Sorry, looks like there are some errors detected, please try again')); ?>",
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "<?php echo e(__('Ok, Go It')); ?>",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                })
                            }))
                        }))
                    })(), (() => {
                        const t = e.querySelector("#kt_roles_select_all"),
                            n = e.querySelectorAll('[type="checkbox"]');
                        t.addEventListener("change", (t => {
                            n.forEach((e => {
                                e.checked = t.target.checked
                            }))
                        }))
                    })()
                }
            }
        }();
        KTUtil.onDOMContentLoaded((function () {
            KTUsersAddRole.init()
        }));

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

    <!--begin::Row-->
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9">
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $roles; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $role): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <!--begin::Col-->
            <div class="col-md-4">
                <!--begin::Card-->
                <div class="card card-flush h-md-100">
                    <!--begin::Card header-->
                    <div class="card-header">
                        <!--begin::Card title-->
                        <div class="card-title">
                            <h2><?php echo e($role->name); ?></h2>
                        </div>
                        <!--end::Card title-->
                    </div>
                    <!--end::Card header-->
                    <!--begin::Card body-->
                    <div class="card-body pt-1">
                        <!--begin::Users-->
                        <div
                            class="fw-bolder text-gray-600 mb-5"><?php echo e(__('Total Users With This Role')); ?> <?php echo e($role->users()->count()); ?></div>
                        <!--end::Users-->
                        <!--begin::Users-->
                        <div
                            class="fw-bolder text-gray-600 mb-5"><?php echo e(__('Total Permissions With This Role')); ?> <?php echo e($role->permissions()->count()); ?></div>
                        <!--end::Users-->
                    </div>
                    <!--end::Card body-->
                    <!--begin::Card footer-->
                    <div class="card-footer flex-wrap pt-0">
                        <a href="<?php echo e(route('admin.roles.show' , $role->id)); ?>"
                           class="btn btn-sm fw-bold btn-secondary"><?php echo e(__('View Role')); ?></a>
                    </div>
                    <!--end::Card footer-->
                </div>
                <!--end::Card-->
            </div>
            <!--end::Col-->
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

        <!--begin::Add new card-->
        <div class="col-md-4">
            <!--begin::Card-->
            <div class="card h-md-100">
                <!--begin::Card body-->
                <div class="card-body d-flex flex-center">
                    <!--begin::Button-->
                    <button type="button" class="btn btn-clear d-flex flex-column flex-center"
                            data-bs-toggle="modal" data-bs-target="#kt_modal_add_role">
                        <!--begin::Illustration-->
<i class="ki-duotone ki-abstract-10 fs-2x">
 <span class="path1"></span>
 <span class="path2"></span>
</i>
                        <!--end::Illustration-->
                        <!--begin::Label-->
                        <span class="fw-bolder fs-3 text-gray-600 text-hover-primary"><?php echo e(__('New Role')); ?></span>
                        <!--end::Label-->
                    </button>
                    <!--begin::Button-->
                </div>
                <!--begin::Card body-->
            </div>
            <!--begin::Card-->
        </div>
        <!--begin::Add new card-->

    </div>
    <!--end::Row-->
    <!--begin::Modals-->
    <!--begin::Modal - Add role-->
    <div class="modal fade" id="kt_modal_add_role" tabindex="-1" aria-hidden="true">
        <!--begin::Modal dialog-->
        <div class="modal-dialog modal-dialog-centered mw-750px">
            <!--begin::Modal content-->
            <div class="modal-content">
                <!--begin::Modal header-->
                <div class="modal-header">
                    <!--begin::Modal title-->
                    <h2 class="fw-bolder"><?php echo e(__('New Role')); ?></h2>
                    <!--end::Modal title-->
                    <!--begin::Close-->
                    <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-roles-modal-action="close">
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                        <span class="svg-icon svg-icon-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1"
                                      transform="rotate(-45 6 17.3137)" fill="black"/>
                                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)"
                                      fill="black"/>
                            </svg>
                        </span>
                        <!--end::Svg Icon-->
                    </div>
                    <!--end::Close-->
                </div>
                <!--end::Modal header-->
                <!--begin::Modal body-->
                <div class="modal-body scroll-y mx-lg-5 my-7">
                    <!--begin::Form-->
                    <form id="kt_modal_add_role_form" class="form" method="post"
                          action="<?php echo e(route('admin.roles.store')); ?>">
                        <?php echo csrf_field(); ?>
                        <!--begin::Scroll-->
                        <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_role_scroll"
                             data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}"
                             data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_role_header"
                             data-kt-scroll-wrappers="#kt_modal_add_role_scroll" data-kt-scroll-offset="300px">
                            <!--begin::Input group-->
                            <div class="fv-row mb-10">
                                <!--begin::Label-->
                                <label class="fs-5 fw-bolder form-label mb-2">
                                    <span class="required"><?php echo e(__('Role Name')); ?></span>
                                </label>
                                <!--end::Label-->
                                <!--begin::Input-->
                                <input class="form-control form-control-solid" placeholder="<?php echo e(__('Enter A Role Name')); ?>"
                                       name="role_name"/>
                                <div class="fv-plugins-message-container invalid-feedback">

                                </div>
                                <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                            <!--begin::Permissions-->
                            <div class="fv-row">
                                <!--begin::Label-->
                                <label class="fs-5 fw-bolder form-label mb-2"><?php echo e(__('Role Permissions')); ?></label>
                                <!--end::Label-->
                                <!--begin::Table wrapper-->
                                <div class="table-responsive">
                                    <!--begin::Table-->
                                    <table class="table align-middle table-row-dashed fs-6 gy-5">
                                        <!--begin::Table body-->
                                        <tbody class="text-gray-600 fw-bold">
                                        <!--begin::Table row-->
                                        <tr>
                                            <td class="text-gray-800"><?php echo e(__('Administrator Access')); ?>

                                                <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                                   title="Allows a full access to the system"></i></td>
                                            <td>
                                                <!--begin::Checkbox-->
                                                <label class="form-check form-check-custom form-check-solid me-9">
                                                    <input class="form-check-input" type="checkbox" value=""
                                                           id="kt_roles_select_all"/>
                                                    <span class="form-check-label"
                                                          for="kt_roles_select_all"><?php echo e(__('Select All')); ?></span>
                                                </label>
                                                <!--end::Checkbox-->
                                            </td>
                                        </tr>
                                        <!--end::Table row-->
                                        <!--begin::Table row-->
                                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $permissions; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $permission): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                            <tr>
                                                <!--begin::Label-->
                                                <td class="text-gray-800"><?php echo e(__($permission->name)); ?></td>
                                                <!--end::Label-->
                                                <!--begin::Options-->
                                                <td>
                                                    <!--begin::Wrapper-->
                                                    <div class="d-flex">
                                                        <!--begin::Checkbox-->
                                                        <label
                                                            class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                                            <input class="form-check-input" type="checkbox"
                                                                   name="permissions[]"
                                                                   value="<?php echo e($permission->name); ?>"/>
                                                        </label>
                                                        <!--end::Checkbox-->
                                                    </div>
                                                    <!--end::Wrapper-->
                                                </td>
                                                <!--end::Options-->
                                            </tr>
                                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                        <!--end::Table row-->
                                        </tbody>
                                        <!--end::Table body-->
                                    </table>
                                    <!--end::Table-->
                                </div>
                                <!--end::Table wrapper-->
                            </div>
                            <!--end::Permissions-->
                        </div>
                        <!--end::Scroll-->
                        <!--begin::Actions-->
                        <div class="text-center pt-15">
                            <button type="reset" class="btn btn-light me-3"
                                    data-kt-roles-modal-action="cancel"><?php echo e(__('Discard')); ?></button>
                            <button type="submit" class="btn btn-primary" data-kt-roles-modal-action="submit">
                                <span class="indicator-label"><?php echo e(__('Submit')); ?></span>
                                <span class="indicator-progress"><?php echo e(__('Please Wait')); ?>

                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                            </button>
                        </div>
                        <!--end::Actions-->
                    </form>
                    <!--end::Form-->
                </div>
                <!--end::Modal body-->
            </div>
            <!--end::Modal content-->
        </div>
        <!--end::Modal dialog-->
    </div>
    <!--end::Modal - Add role-->
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


<?php /**PATH D:\www\mutlu\Modules/User\resources/views/admin/role/index.blade.php ENDPATH**/ ?>