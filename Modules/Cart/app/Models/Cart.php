<?php

namespace Modules\Cart\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Cart\Database\Factories\CartFactory;

class Cart extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): CartFactory
    // {
    //     // return CartFactory::new();
    // }
}
