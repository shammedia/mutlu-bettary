<?php

namespace Modules\Order\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Shop\Models\SubProduct;

// use Modules\Order\Database\Factories\ItemFactory;

class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $guarded = [];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(SubProduct::class, 'product_sub_product_id');
    }
    // protected static function newFactory(): ItemFactory
    // {
    //     // return ItemFactory::new();
    // }
}
