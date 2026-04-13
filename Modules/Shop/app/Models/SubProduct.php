<?php

namespace Modules\Shop\Models;

use Illuminate\Database\Eloquent\Model;

class SubProduct extends Model
{
    protected $table = 'product_sub_products';

    protected $fillable = [
        'product_id',
        'slides',
        'name',
        'capacity',
        'voltage',
        'box',
        'length',
        'height',
        'weight',
        'price',
    ];

    protected $casts = [
        'slides' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}


