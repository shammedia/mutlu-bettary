<?php

namespace Modules\Order\Http\Controllers;

use App\Http\Controllers\Controller;
use Config;
use Illuminate\Http\Request;
use Modules\Base\Models\Settings;
use Modules\Order\app\Enums\OrderEnum;
use Modules\Order\Models\Item;
use Modules\Order\Models\Order;

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
        ]);
        foreach ($request->items as $item) {

            Item::create([
                'order_id' => $order->id,
                'product_sub_product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }
        $message = "";
        $message .= "رقم الطلب : {$order->id}\n";
        $message .= "السعر  : {$order->subtotal}\n";
        $message .= "الشحن  : {$order->shipping}\n";
        $message .= "الاجمالي  : {$order->total}\n";
        $message .= "-----------------------------\n";

        foreach ($order->items as $item) {
            $message.="\n المنتج \n";
            $message.="\n {$item->product->name} \n";
            $message.="\n العدد \n";
            $message.="\n {$item->quantity} \n";
            $message.="\n السعر \n";
            $message.="\n {$item->price} \n";
            $message.="\n الإجمالي \n";
            $message.="\n {$item->total} \n";
            $message .= "-----------------------------\n";
        }


        if ($order->map != '') {

            $message .= "\n الموقع \n";
            $message .= $order->map;
        }
        if ($order->address != '') {

            $message .= "\n العنوان \n";
            $message .= $order->address;

        }
        $message .= "\n الهاتف \n";
        $message .= $order->phone;
        $msg = urlencode($message);
        $shippingPhone = ltrim(Settings::get('phone'), '+');
        return back()->with('wa',"https://wa.me/{$shippingPhone}?text={$msg}");
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
        $message = "";
        $message .= "رقم الطلب : {$order->id}\n";
        $message .= "السعر  : {$order->subtotal}\n";
        $message .= "الشحن  : {$order->shipping}\n";
        $message .= "الاجمالي  : {$order->total}\n";
        $message .= "-----------------------------\n";

        foreach ($order->items as $item) {
            $message.="\n المنتج \n";
            $message.="\n {$item->product->name} \n";
            $message.="\n العدد \n";
            $message.="\n {$item->quantity} \n";
            $message.="\n السعر \n";
            $message.="\n {$item->price} \n";
            $message.="\n الإجمالي \n";
            $message.="\n {$item->total} \n";
            $message .= "-----------------------------\n";
        }


        if ($order->map != '') {

            $message .= "\n الموقع \n";
            $message .= $order->map;
        }
        if ($order->address != '') {

            $message .= "\n العنوان \n";
            $message .= $order->address;

        }
        $message .= "\n الهاتف \n";
        $message .= $order->phone;
        $msg = urlencode($message);
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
