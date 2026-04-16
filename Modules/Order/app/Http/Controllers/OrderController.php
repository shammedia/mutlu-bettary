<?php

namespace Modules\Order\Http\Controllers;

use App\Http\Controllers\Controller;
use Config;
use Illuminate\Http\Request;
use Modules\Base\Models\Settings;
use Modules\Order\app\Enums\DeliveryTypeEnum;
use Modules\Order\app\Enums\OrderEnum;
use Modules\Order\Models\Item;
use Modules\Order\Models\Order;
use Modules\Shop\Models\SubProduct;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('order::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('order::create');
    }

    private function generateMsg($order)
    {
        $message = "";
        $message .= " العميل : {$order->name}\n";
        $message .= "رقم الطلب : {$order->id}\n";
        $message .= "شحن إلى : " . DeliveryTypeEnum::tryFrom($order->delivery_type)?->getLabel() . "\n";
        $message .= "السعر  : {$order->subtotal}\n";
        $message .= "الشحن  : {$order->shipping}\n";
        $message .= "الاجمالي  : {$order->total}\n";
        $message .= "-----------------------------\n";

        foreach ($order->items as $item) {
            $message .= "المنتج : {$item->product->name}\n";
            $message .= "الفئة : {$item->product?->product?->getTranslation('title', app()->getLocale())}\n";
            $message .= "العدد : {$item->quantity}\n";
            $message .= "السعر : {$item->price}\n";
            $message .= "الإجمالي : {$item->total}\n";
            $message .= "-----------------------------\n";
        }


        if ($order->map != '') {

            $message .= "الموقع: ";
            $message .= "\n {$order->map} \n";
        }
        if ($order->address != '') {
            $message .= "العنوان  : {$order->address}\n";


        }
        $message .= "الهاتف  : {$order->phone}\n";

        return rawurlencode($message);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $order = Order::create([
            'delivery_type' => $request->deliveryType,
            'shipping' => $request->shippingCost,
            'address' => $request->address,
            'subtotal' => $request->subPrice,
            'status' => 'pending',
            'phone' => $request->phone,
            'map' => $request->map,
            'name'=>$request->name,
        ])->refresh();


        foreach ($request->items as $item) {
            $product = SubProduct::find($item['id']);
            if (!$product) {
                continue;
            }
            Item::create([
                'order_id' => $order->id,
                'product_sub_product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }
        $order->refresh();
        $msg = $this->generateMsg($order);
        $shippingPhone = ltrim(Settings::get('phone'), '+');
        return back()->with('wa', "https://wa.me/{$shippingPhone}?text={$msg}");
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        $order = Order::with(['items' => fn($query) => $query->with('product')])->findOrFail($id);
        return view('order::admin.show', compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('order::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $status = $request->status;
        $order = Order::findOrFail($id);
        $order->update([
            'status' => OrderEnum::DONE->value,
        ]);
        $msg = $this->generateMsg($order);
        $shippingPhone = Settings::get('shipping_phone');
        return redirect()->to("https://wa.me/{$shippingPhone}?text={$msg}");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Order::findOrFail($id)->update(['status' => OrderEnum::CANCELED->value]);
        return redirect()->back();
    }

    public function all()
    {
        $model = Order::
        withCount('items')
            ->latest()
            ->paginate(Config::get('core.page_size', 10));
        return view('order::admin.index', compact('model'));
    }
}
