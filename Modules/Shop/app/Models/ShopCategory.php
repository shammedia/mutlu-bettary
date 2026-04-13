<?php

namespace Modules\Shop\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class ShopCategory extends Model
{
    use HasTranslations;

    public $translatable = ['name'];

    protected $fillable = ['name', 'slug'];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
