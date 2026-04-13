<?php

namespace Modules\Base\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Branch extends Model
{
    use HasTranslations;

    protected $fillable = ['name', 'city', 'address', 'phone', 'lat', 'lng'];

    public array $translatable = ['name', 'city', 'address', 'phone'];

    // Keep as string to avoid float rounding (we parse to Number() on the frontend for maps)
    protected $casts = [
        'lat' => 'string',
        'lng' => 'string',
    ];
}



