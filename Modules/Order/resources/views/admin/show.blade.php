@section('title' , __('Show Order'))

@section('toolbar')
    @php
        $breadcrumbItems = [
            ['label' => 'Dashboard', 'url' => route('admin.dashboard.index')],
            ['label' => 'Orders', 'url' => route('admin.orders.all')],
            ['label' => 'Show Order']
        ];
    @endphp
    <x-admin.breadcrumb :pageTitle="__('Show Order')" :breadcrumbItems="$breadcrumbItems"/>
    <div class="d-flex align-items-center gap-2 gap-lg-3">
    </div>
@endsection

<x-admin-layout>

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ __('Order Details') }}</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <th>{{ trans('Order ID') }}</th>
                                            <td>{{ $order->id }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ __('Delivery Type') }}</th>
                                            <td>{{ \Modules\Order\app\Enums\DeliveryTypeEnum::tryFrom($order->delivery_type)?->getLabel() }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ __('Status') }}</th>
                                            <td>{{ \Modules\Order\app\Enums\OrderEnum::class::tryFrom($order->status)?->getLabel() }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ __('Subtotal') }}</th>
                                            <td>{{ $order->subtotal }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ __('Shipping') }}</th>
                                            <td>{{ $order->shipping }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ __('Total') }}</th>
                                            <td>{{ $order->total }}</td>
                                        </tr>
                                        @if($order->address!='')
                                        <tr>
                                            <th>{{ __('Address') }}</th>
                                            <td>{{ $order->address }}</td>
                                        </tr>
                                        @endif
                                        <tr>
                                            <th>{{ __('Phone') }}</th>
                                            <td><a href="https://wa.me/{{ ltrim($order->phone,'+') }}">{{$order->phone}}</a></td>
                                        </tr>
                                        <tr>
                                            <th>{{ __('Created At') }}</th>
                                            <td>{{ $order->created_at->diffForHumans() }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ __('Address') }}</th>
                                            <td>{{ $order->address}}</td>
                                        </tr>
                                    @if($order->map!='')
                                        <tr>
                                            <th>{{ __('Map') }}</th>
                                            <td>
                                                <a href="{{ $order->map }}" target="_blank">{{trans('View Location')}}</a>
                                            </td>
                                        </tr>
                                        @endif
                                        @if($order->status==\Modules\Order\app\Enums\OrderEnum::class::PENDING->value)
                                        <tr>
                                            <td>
                                            <form action="{{route('admin.orders.update',$order->id)}}" method="post">
                                                @method('put')
                                                @csrf

                                                <button class="btn btn-success">إرسال الطلب للشحن</button>
                                            </form>
                                           </td>
                                            <td>
                                                <form action="{{route('admin.orders.destroy',$order->id)}}" method="post">
                                                    @method('delete')
                                                    @csrf
                                                    <button class="btn btn-danger">إلغاء الطلب</button>
                                                </form>
                                            </td>
                                        </tr>
                                            @endif
                                    </tbody>
                                </table>
            </div>
        </div>
    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ trans('Order Items') }}</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>{{ trans('Product') }}</th>
                                            <th>{{ trans('Category') }}</th>
                                            <th>{{ trans('Quantity') }}</th>
                                            <th>{{ trans('Price') }}</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($order->items as $item)
                                            @php

                                                $productName = $item->product->name;
                                                if (is_array($productName)) {
                                                    $productName = count($productName) ? reset($productName) : '';
                                                }
                                            @endphp
                                            <tr>
                                                <td>{{ $productName }}</td>
                                                <td>{{ $item->product?->product?->getTranslation('title', app()->getLocale()) }}</td>
                                                <td>{{ $item->quantity }}</td>
                                                <td>{{ $item->product->price }}</td>

                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</x-admin-layout>











