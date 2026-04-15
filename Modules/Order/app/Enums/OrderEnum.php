<?php

namespace Modules\Order\app\Enums;

enum OrderEnum: string
{
    case PENDING = 'pending';
    case DONE = 'done';
    case CANCELED = 'canceled';


    public  function getLabel(): string
    {
        return match ($this) {
            self::PENDING => trans('Pending'),

            self::DONE => trans('Done'),
            self::CANCELED =>trans('Canceled'),
        };
    }

}
