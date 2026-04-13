<?php $__env->startSection('title' , __('Add New Product')); ?>

<?php $__env->startSection('toolbar'); ?>
    <?php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Products', 'url' => route('admin.products.index')],
            ['label' => 'Add New Product']
        ];
    ?>
    <?php if (isset($component)) { $__componentOriginaldbbc880c47f621cda59b70d6eb356b2f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.breadcrumb','data' => ['pageTitle' => __('Add New Product'),'breadcrumbItems' => $breadcrumbItems]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.breadcrumb'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['pageTitle' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(__('Add New Product')),'breadcrumbItems' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($breadcrumbItems)]); ?>
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
    <?php echo $__env->make('base::shared._tinymce', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <script>
        $(document).ready(function (e) {
            var input1 = document.querySelector("#kt_tagify_1");
            new Tagify(input1);

            let subProductIndex = $('#product-sub-products-body tr').length || 0;

            function subProductRowHtml(idx, data) {
                const nameVal = (data && data.name) ? data.name : '';
                const capacityVal = (data && data.capacity) ? data.capacity : '';
                const voltageVal = (data && data.voltage) ? data.voltage : '';
                const boxVal = (data && data.box) ? data.box : '';
                const lengthVal = (data && data.length) ? data.length : '';
                const heightVal = (data && data.height) ? data.height : '';
                const weightVal = (data && data.weight) ? data.weight : '';

                return `
                    <tr>
                        <td>
                            <input type="file" class="form-control form-control-solid" name="sub_products[${idx}][slides][]" accept=".png, .jpg, .jpeg, .webp" multiple>
                            <div class="form-text"><?php echo e(__('At least one image is required')); ?></div>
                        </td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][name]" value="${nameVal}" placeholder="<?php echo e(__('Name')); ?>"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][capacity]" value="${capacityVal}" placeholder="<?php echo e(__('Capacity (Ah)')); ?>"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][voltage]" value="${voltageVal}" placeholder="<?php echo e(__('Voltage (V)')); ?>"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][box]" value="${boxVal}" placeholder="<?php echo e(__('Box')); ?>"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][length]" value="${lengthVal}" placeholder="<?php echo e(__('Length (mm)')); ?>"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][height]" value="${heightVal}" placeholder="<?php echo e(__('Height (mm)')); ?>"></td>
                        <td><input type="text" class="form-control form-control-solid" name="sub_products[${idx}][weight]" value="${weightVal}" placeholder="<?php echo e(__('Weight (kg)')); ?>"></td>
                        <td class="text-end"><button type="button" class="btn btn-sm btn-light-danger remove-sub-product-row"><?php echo e(__('Remove')); ?></button></td>
                    </tr>
                `;
            }

            $('#add-sub-product-row').on('click', function () {
                $('#product-sub-products-body').append(subProductRowHtml(subProductIndex++, {}));
            });

            $(document).on('click', '.remove-sub-product-row', function () {
                $(this).closest('tr').remove();
                if ($('#product-sub-products-body tr').length === 0) {
                    $('#product-sub-products-body').append(subProductRowHtml(subProductIndex++, {}));
                }
            });
        });
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
    <?php if (isset($component)) { $__componentOriginal6dd53ea036ef0ad42242489cd935340d = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal6dd53ea036ef0ad42242489cd935340d = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.create-card','data' => ['title' => 'Add New Product','formUrl' => route('admin.products.store')]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.create-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Add New Product','formUrl' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(route('admin.products.store'))]); ?>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><?php echo e(__('Image')); ?> <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <div class="image-input image-input-outline " data-kt-image-input="true"
                     style="background-image: url('<?php echo e(asset('images/default.jpg')); ?>')">
                    <div class="image-input-wrapper w-500px h-250px bgi-position-center"
                         style="background-size: 75%; background-image: url(<?php echo e(asset('images/default.jpg')); ?>)"></div>
                    <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                           data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                        <i class="bi bi-pencil-fill fs-7"></i>
                        <input type="file" name="img" accept=".png, .jpg, .jpeg, .webp" required/>
                        <input type="hidden" name="avatar_remove"/>
                    </label>
                    <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                          data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                        <i class="bi bi-x fs-2"></i>
                    </span>
                    <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                          data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                        <i class="bi bi-x fs-2"></i>
                    </span>
                </div>
                <div class="form-text"> 800px * 600px</div>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><?php echo e(__('Category')); ?> <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <select name="category_id" class="form-control form-control-solid" required>
                    <option value=""><?php echo e(__('Select Category')); ?></option>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $category): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <option value="<?php echo e($category->id); ?>"><?php echo e($category->name); ?></option>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </select>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i><?php echo e(__('Title')); ?>

                    <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" class="form-control form-control-solid" name="title" value="<?php echo e(old('title')); ?>"
                       placeholder="<?php echo e(__('Title')); ?>"/>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><?php echo e(__('Url')); ?> <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input type="text" id="gslug" name="gslug" class="form-control form-control-solid mb-3 mb-lg-0"
                       placeholder="" value="<?php echo e(old('slug')); ?>"/>
                <input type="hidden" name="slug" value="<?php echo e(old('slug')); ?>" id="slug">
                <div class="my-3" id="link"><?php echo e(old('slug')); ?></div>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i
                        class="bi bi-translate text-primary mx-1 "></i><?php echo e(__('Short Description')); ?> <span
                        class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <p class="text-success fw-bold mb-1"><?php echo e(__('This Description Very Important For SEO Should Be Between 150-160 characters')); ?></p>
                <input type="text" class="form-control form-control-solid" name="description" id="description"
                       value="<?php echo e(old('description')); ?>" placeholder="<?php echo e(__('Short Description')); ?>..."/>
                <small class="text-muted" id="wordCountDisplay"></small>
            </div>
        </div>

        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i><?php echo e(__('Content')); ?>

                    <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <textarea name="content" class="form-control form-control-solid "
                          id="tinymce"><?php echo old('content'); ?></textarea>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><i class="bi bi-translate text-primary mx-1 "></i><?php echo e(__('Keywords')); ?>

                    <span class="text-danger">*</span></div>
            </div>
            <div class="col-xl-9 fv-row">
                <input class="form-control" value="<?php echo e(old('keywords' , 'Shop,')); ?>" name="keywords"
                       id="kt_tagify_1"/>
            </div>
        </div>

        <?php
            $subProducts = old('sub_products', []);
        ?>
        <div class="row mb-8">
            <div class="col-xl-12">
                <div class="fs-6 fw-bold mt-2 mb-3"><?php echo e(__('Available sizes')); ?></div>
            </div>
            <div class="col-xl-12 fv-row">
                <div class="d-flex justify-content-end mb-3">
                    <button type="button" class="btn btn-sm btn-light-primary" id="add-sub-product-row">
                        <?php echo e(__('Add New Size')); ?> +
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-3">
                        <thead>
                        <tr class="fw-bold text-muted">
                            <th><?php echo e(__('Slides')); ?></th>
                            <th><?php echo e(__('Name')); ?></th>
                            <th><?php echo e(__('Capacity (Ah)')); ?></th>
                            <th><?php echo e(__('Voltage (V)')); ?></th>
                            <th><?php echo e(__('Box')); ?></th>
                            <th><?php echo e(__('Length (mm)')); ?></th>
                            <th><?php echo e(__('Height (mm)')); ?></th>
                            <th><?php echo e(__('Weight (kg)')); ?></th>
                            <th class="text-end"><?php echo e(__('Actions')); ?></th>
                        </tr>
                        </thead>
                        <tbody id="product-sub-products-body">
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(is_array($subProducts) && count($subProducts)): ?>
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $subProducts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $idx => $sp): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <tr>
                                    <td>
                                        <input type="file" class="form-control form-control-solid" name="sub_products[<?php echo e($idx); ?>][slides][]" accept=".png, .jpg, .jpeg, .webp" multiple>
                                        <div class="form-text"><?php echo e(__('At least one image is required')); ?></div>
                                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__errorArgs = ["sub_products.$idx.slides"];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                                        <div class="text-danger mt-1"><?php echo e($message); ?></div>
                                        <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                    </td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[<?php echo e($idx); ?>][name]" value="<?php echo e($sp['name'] ?? ''); ?>" placeholder="<?php echo e(__('Name')); ?>"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[<?php echo e($idx); ?>][capacity]" value="<?php echo e($sp['capacity'] ?? ''); ?>" placeholder="<?php echo e(__('Capacity (Ah)')); ?>"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[<?php echo e($idx); ?>][voltage]" value="<?php echo e($sp['voltage'] ?? ''); ?>" placeholder="<?php echo e(__('Voltage (V)')); ?>"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[<?php echo e($idx); ?>][box]" value="<?php echo e($sp['box'] ?? ''); ?>" placeholder="<?php echo e(__('Box')); ?>"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[<?php echo e($idx); ?>][length]" value="<?php echo e($sp['length'] ?? ''); ?>" placeholder="<?php echo e(__('Length (mm)')); ?>"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[<?php echo e($idx); ?>][height]" value="<?php echo e($sp['height'] ?? ''); ?>" placeholder="<?php echo e(__('Height (mm)')); ?>"></td>
                                    <td><input type="text" class="form-control form-control-solid" name="sub_products[<?php echo e($idx); ?>][weight]" value="<?php echo e($sp['weight'] ?? ''); ?>" placeholder="<?php echo e(__('Weight (kg)')); ?>"></td>
                                    <td class="text-end">
                                        <button type="button" class="btn btn-sm btn-light-danger remove-sub-product-row"><?php echo e(__('Remove')); ?></button>
                                    </td>
                                </tr>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        <?php else: ?>
                            <tr>
                                <td>
                                    <input type="file" class="form-control form-control-solid" name="sub_products[0][slides][]" accept=".png, .jpg, .jpeg, .webp" multiple>
                                    <div class="form-text"><?php echo e(__('At least one image is required')); ?></div>
                                </td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][name]" value="" placeholder="<?php echo e(__('Name')); ?>"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][capacity]" value="" placeholder="<?php echo e(__('Capacity (Ah)')); ?>"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][voltage]" value="" placeholder="<?php echo e(__('Voltage (V)')); ?>"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][box]" value="" placeholder="<?php echo e(__('Box')); ?>"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][length]" value="" placeholder="<?php echo e(__('Length (mm)')); ?>"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][height]" value="" placeholder="<?php echo e(__('Height (mm)')); ?>"></td>
                                <td><input type="text" class="form-control form-control-solid" name="sub_products[0][weight]" value="" placeholder="<?php echo e(__('Weight (kg)')); ?>"></td>
                                <td class="text-end">
                                    <button type="button" class="btn btn-sm btn-light-danger remove-sub-product-row"><?php echo e(__('Remove')); ?></button>
                                </td>
                            </tr>
                        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><?php echo e(__('Publish Status')); ?></div>
            </div>
            <div class="col-xl-9 fv-row">
                <div class="form-check form-switch form-check-custom form-check-solid me-10">
                    <input class="form-check-input h-30px w-50px"
                           <?php if(old('publish') == 'Published'): echo 'checked'; endif; ?> type="checkbox" name="publish"
                           id="flexSwitch30x50"/>
                </div>
            </div>
        </div>
        <div class="row mb-8">
            <div class="col-xl-3">
                <div class="fs-6 fw-bold mt-2 mb-3"><?php echo e(__('Featured')); ?></div>
            </div>
            <div class="col-xl-9 fv-row">
                <div class="form-check form-switch form-check-custom form-check-solid me-10">
                    <input class="form-check-input h-30px w-50px" <?php if(old('featured')): echo 'checked'; endif; ?> type="checkbox"
                           name="featured"
                           id="flexSwitch30x50"/>
                </div>
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











<?php /**PATH D:\websites\mutlu\Modules/Shop\resources/views/admin/product/create.blade.php ENDPATH**/ ?>