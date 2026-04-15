<?php $__env->startSection('title' , __('Show Order')); ?>

<?php $__env->startSection('toolbar'); ?>
    <?php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Orders', 'url' => route('admin.orders.all')],
            ['label' => 'Show Order']
        ];
    ?>
    <?php if (isset($component)) { $__componentOriginaldbbc880c47f621cda59b70d6eb356b2f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.breadcrumb','data' => ['pageTitle' => __('Show Order'),'breadcrumbItems' => $breadcrumbItems]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.breadcrumb'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['pageTitle' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(__('Show Order')),'breadcrumbItems' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($breadcrumbItems)]); ?>
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

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><?php echo e(__('Order Details')); ?></h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <th><?php echo e(trans('Order ID')); ?></th>
                                            <td><?php echo e($order->id); ?></td>
                                        </tr>
                                        <tr>
                                            <th><?php echo e(__('Delivery Type')); ?></th>
                                            <td><?php echo e(\Modules\Order\app\Enums\DeliveryTypeEnum::tryFrom($order->delivery_type)?->getLabel()); ?></td>
                                        </tr>
                                        <tr>
                                            <th><?php echo e(__('Status')); ?></th>
                                            <td><?php echo e(\Modules\Order\app\Enums\OrderEnum::class::tryFrom($order->status)?->getLabel()); ?></td>
                                        </tr>
                                        <tr>
                                            <th><?php echo e(__('Subtotal')); ?></th>
                                            <td><?php echo e($order->subtotal); ?></td>
                                        </tr>
                                        <tr>
                                            <th><?php echo e(__('Shipping')); ?></th>
                                            <td><?php echo e($order->shipping); ?></td>
                                        </tr>
                                        <tr>
                                            <th><?php echo e(__('Total')); ?></th>
                                            <td><?php echo e($order->total); ?></td>
                                        </tr>
                                        <tr>
                                            <th><?php echo e(__('Created At')); ?></th>
                                            <td><?php echo e($order->created_at->diffForHumans()); ?></td>
                                        </tr>
                                        <tr>
                                            <th><?php echo e(__('Address')); ?></th>
                                            <td><?php echo e($order->address); ?></td>
                                        </tr>
                                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($order->map!=''): ?>
                                        <tr>
                                            <th><?php echo e(__('Map')); ?></th>
                                            <td>
                                                <a href="<?php echo e($order->map); ?>" target="_blank"><?php echo e(trans('View Location')); ?></a>
                                            </td>
                                        </tr>
                                        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($order->status==\Modules\Order\app\Enums\OrderEnum::class::PENDING->value): ?>
                                        <tr>
                                            <td>
                                            <form action="<?php echo e(route('admin.orders.update',$order->id)); ?>" method="post">
                                                <?php echo method_field('put'); ?>
                                                <?php echo csrf_field(); ?>

                                                <button class="btn btn-success">إرسال الطلب للشحن</button>
                                            </form>
                                           </td>
                                            <td>
                                                <form action="<?php echo e(route('admin.orders.destroy',$order->id)); ?>" method="post">
                                                    <?php echo method_field('delete'); ?>
                                                    <?php echo csrf_field(); ?>
                                                    <button class="btn btn-danger">إلغاء الطلب</button>
                                                </form>
                                            </td>
                                        </tr>
                                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                    </tbody>
                                </table>
            </div>
        </div>
    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><?php echo e(trans('Order Items')); ?></h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th><?php echo e(trans('Product')); ?></th>
                                            <th><?php echo e(trans('Quantity')); ?></th>
                                            <th><?php echo e(trans('Price')); ?></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $order->items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                            <?php

                                                $productName = $item->product->name;
                                                if (is_array($productName)) {
                                                    $productName = count($productName) ? reset($productName) : '';
                                                }
                                            ?>
                                            <tr>
                                                <td><?php echo e($productName); ?></td>
                                                <td><?php echo e($item->quantity); ?></td>
                                                <td><?php echo e($item->price); ?></td>
                                            </tr>
                                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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











<?php /**PATH D:\www\mutlu\Modules/Order\resources/views/admin/show.blade.php ENDPATH**/ ?>