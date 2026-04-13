<?php

namespace Modules\Shop\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Product extends Model
{
    use HasTranslations;

    public $translatable = ['title', 'description', 'keywords', 'content'];

    protected $appends = ['image_link'];

    protected $fillable = [
        'image',
        'category_id',
        'title',
        'slug',
        'description',
        'keywords',
        'content',
        'status',
        'featured',
        'visits',
    ];

    public function getImageLinkAttribute()
    {
        if ($this->attributes['image']) {
            $path = asset('storage/'.$this->attributes['image']);
        } else {
            $path = asset('images/blank.png');
        }

        return $path;
    }

    public function category()
    {
        return $this->belongsTo(ShopCategory::class, 'category_id');
    }

    public function subProducts()
    {
        return $this->hasMany(SubProduct::class, 'product_id');
    }
}
