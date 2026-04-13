<?php $__env->startSection('title' , __('Firewall Logs')); ?>

<?php $__env->startSection('toolbar'); ?>
    <?php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Firewall Logs'],
        ];
    ?>
    <?php if (isset($component)) { $__componentOriginaldbbc880c47f621cda59b70d6eb356b2f = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginaldbbc880c47f621cda59b70d6eb356b2f = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.breadcrumb','data' => ['pageTitle' => __('Firewall Logs'),'breadcrumbItems' => $breadcrumbItems]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.breadcrumb'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['pageTitle' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(__('Firewall Logs')),'breadcrumbItems' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($breadcrumbItems)]); ?>
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
        <a href="<?php echo e(route('admin.firewall_logs.export')); ?>" class="btn btn-sm btn-primary">
            <i class="bi bi-file-earmark-excel"></i> <?php echo e(__('Export to Excel')); ?>

        </a>
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
    <?php if (isset($component)) { $__componentOriginal53cf72b3da4b8700c9115c02c0eead10 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal53cf72b3da4b8700c9115c02c0eead10 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.table','data' => ['model' => $model,'search' => 'Search in Firewall Logs','formUrl' => null]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.table'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['model' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute($model),'search' => 'Search in Firewall Logs','formUrl' => \Illuminate\View\Compilers\BladeCompiler::sanitizeComponentAttribute(null)]); ?>
        <!--begin::Table head-->
        <thead>
        <tr class="text-start text-muted fw-bold fs-7 gs-0">
            <th><?php echo e(__('IP Address')); ?></th>
            <th><?php echo e(__('Level')); ?></th>
            <th><?php echo e(__('Middleware')); ?></th>
            <th><?php echo e(__('URL')); ?></th>
            <th><?php echo e(__('User')); ?></th>
            <th><?php echo e(__('Created At')); ?></th>
            <th><?php echo e(__('Actions')); ?></th>
        </tr>
        </thead>
        <!--end::Table head-->
        <!--begin::Table body-->
        <tbody class="text-gray-600 fw-semibold">
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $model; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $log): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <tr>
                <td>
                    <a href="https://whatismyipaddress.com/ip/<?php echo e($log->ip); ?>" target="_blank">
                        <?php echo e($log->ip); ?>

                    </a>
                </td>
                <td>
                    <?php
                        $levelColors = [
                            'low' => 'success',
                            'medium' => 'warning',
                            'high' => 'danger',
                        ];
                        $color = $levelColors[$log->level] ?? 'secondary';
                    ?>
                    <span class="badge badge-light-<?php echo e($color); ?> fs-7 fw-bold"><?php echo e(ucfirst($log->level)); ?></span>
                </td>
                <td>
                    <span class="badge badge-light-info fs-7 fw-bold"><?php echo e($log->middleware); ?></span>
                </td>
                <td>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($log->url): ?>
                        <a href="<?php echo e($log->url); ?>" target="_blank" class="text-primary text-hover-primary">
                            <?php echo e(Str::limit($log->url, 50)); ?>

                        </a>
                    <?php else: ?>
                        <span class="text-muted">-</span>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </td>
                <td>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($log->user_id): ?>
                        <span class="text-gray-800"><?php echo e($log->user_id); ?></span>
                    <?php else: ?>
                        <span class="text-muted">-</span>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                </td>
                <td>
                    <?php echo e($log->created_at->format('Y-m-d H:i:s')); ?>

                </td>
                <td>
                    <button type="button" class="btn btn-sm btn-light-primary" data-bs-toggle="modal" data-bs-target="#logModal<?php echo e($log->id); ?>">
                        <i class="bi bi-eye"></i> <?php echo e(__('View Details')); ?>

                    </button>
                </td>
            </tr>

            <!-- Log Details Modal -->
            <div class="modal fade" id="logModal<?php echo e($log->id); ?>" tabindex="-1" aria-labelledby="logModalLabel<?php echo e($log->id); ?>" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="logModalLabel<?php echo e($log->id); ?>"><?php echo e(__('Firewall Log Details')); ?></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <strong><?php echo e(__('IP Address')); ?>:</strong>
                                    <p><a href="https://whatismyipaddress.com/ip/<?php echo e($log->ip); ?>" target="_blank"><?php echo e($log->ip); ?></a></p>
                                </div>
                                <div class="col-md-6">
                                    <strong><?php echo e(__('Level')); ?>:</strong>
                                    <p><span class="badge badge-light-<?php echo e($color); ?>"><?php echo e(ucfirst($log->level)); ?></span></p>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <strong><?php echo e(__('Middleware')); ?>:</strong>
                                    <p><span class="badge badge-light-info"><?php echo e($log->middleware); ?></span></p>
                                </div>
                                <div class="col-md-6">
                                    <strong><?php echo e(__('User ID')); ?>:</strong>
                                    <p><?php echo e($log->user_id ?? '-'); ?></p>
                                </div>
                            </div>
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($log->url): ?>
                            <div class="mb-3">
                                <strong><?php echo e(__('URL')); ?>:</strong>
                                <p><a href="<?php echo e($log->url); ?>" target="_blank" class="text-primary"><?php echo e($log->url); ?></a></p>
                            </div>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($log->referrer): ?>
                            <div class="mb-3">
                                <strong><?php echo e(__('Referrer')); ?>:</strong>
                                <p><?php echo e($log->referrer); ?></p>
                            </div>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($log->request): ?>
                            <div class="mb-3">
                                <strong><?php echo e(__('Request Data')); ?>:</strong>
                                <pre class="bg-light p-3 rounded" style="max-height: 300px; overflow-y: auto; font-size: 12px;"><?php echo e(Str::limit($log->request, 1000)); ?></pre>
                            </div>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <strong><?php echo e(__('Created At')); ?>:</strong>
                                    <p><?php echo e($log->created_at->format('Y-m-d H:i:s')); ?></p>
                                </div>
                                <div class="col-md-6">
                                    <strong><?php echo e(__('Updated At')); ?>:</strong>
                                    <p><?php echo e($log->updated_at->format('Y-m-d H:i:s')); ?></p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><?php echo e(__('Close')); ?></button>
                            <button type="button" class="btn btn-danger" onclick="blockIp('<?php echo e($log->ip); ?>')">
                                <i class="bi bi-lock"></i> <?php echo e(__('Block IP')); ?>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
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

<?php $__env->startSection('js'); ?>
<script>
	function blockIp(ip) {
		if (!confirm('<?php echo e(__("Are you sure you want to block this IP address?")); ?>')) {
			return;
		}
		var form = document.createElement('form');
		form.method = 'POST';
		form.action = '<?php echo e(route('admin.firewall.block')); ?>';
		var token = document.createElement('input');
		token.type = 'hidden';
		token.name = '_token';
		token.value = '<?php echo e(csrf_token()); ?>';
		var ipInput = document.createElement('input');
		ipInput.type = 'hidden';
		ipInput.name = 'ip';
		ipInput.value = ip;
		form.appendChild(token);
		form.appendChild(ipInput);
		document.body.appendChild(form);
		form.submit();
	}
</script>
<?php $__env->stopSection(); ?>



<?php /**PATH /var/www/vhosts/mutlu-battery.com/httpdocs/Modules/Support/resources/views/admin/firewall_log/index.blade.php ENDPATH**/ ?>