<?php

namespace Modules\Order\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
      $order=  Order::create([
            'delivery_type'=>$request->deliveryType,
            'shipping'=>$request->shippingCost,
            'address'=>$request->address,
            'subtotal' => $request->subtotal,
            'status' => 'pending',
        ]);
        foreach ($request->items as $item) {

            Item::create([
                'order_id' => $order->id,
                'product_sub_product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
      }
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('order::show');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }

    public function all(){
        return view('order::admin.index');
    }
}
