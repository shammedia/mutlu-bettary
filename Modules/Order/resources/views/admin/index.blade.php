@section('title' , __('Shop Categories'))

@section('toolbar')
    @php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Orders'],
        ];
    @endphp
    <x-admin.breadcrumb :pageTitle="__('Orders')" :breadcrumbItems="$breadcrumbItems"/>
@endsection
@section('js')
@endsection
<x-admin-layout>
   <x-admin.table :model="$model" search="Search In Shop Categories"
                   {{--:form-url="route('admin.orders.all')"--}}>
        <thead>
        <tr class="text-start text-muted fw-bold fs-7 gs-0">
            <th class="w-10px pe-2" data-orderable="false">
                <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
                    <input class="form-check-input" type="checkbox" data-kt-check="true"
                           data-kt-check-target="#dataTable .form-check-input" value="1"/>
                </div>
            </th>
            <th class="min-w-100px">{{__('Delivery Type')}}</th>
            <th class="min-w-100px">{{__('Status')}}</th>
            <th class="min-w-100px">{{__('Shipping')}}</th>
            <th class="min-w-100px">{{__('Subtotal')}}</th>
            <th class="min-w-100px">{{__('Total')}}</th>
            <th class="min-w-100px">{{__('Created At')}}</th>
            <th class="min-w-100px text-end rounded-end"></th>
        </thead>
        <tbody class="text-gray-600 fw-semibold">
        @foreach($model as $order)
            <tr>
                <td>
                    <div class="form-check form-check-sm form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" name="ids[]" value="{{$order->id}}"/>
                    </div>
                </td>
                <td>{{\Modules\Order\app\Enums\DeliveryTypeEnum::tryFrom($order->delivery_type)?->getLabel()}}</td>
                <td>{{\Modules\Order\app\Enums\OrderEnum::tryFrom($order->status)?->getLabel()}}</td>
                <td>{{$order->shipping}}</td>
                <td>{{$order->subtotal }}</td>
                <td>{{$order->total }}</td>
                <td>{{$order->created_at->diffForHumans() }}</td>
                <td class="text-end">
                    <a href="{{ route('admin.orders.show', $order->id) }}"
                       class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                        <i class="ki-duotone ki-message-edit fs-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                        </i>
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </x-admin.table>

</x-admin-layout>


