<?php

namespace Modules\Order\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

// use Modules\Order\Database\Factories\OrderFactory;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $guarded = [];


    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }
    // protected static function newFactory(): OrderFactory
    // {
    //     // return OrderFactory::new();
    // }
}
