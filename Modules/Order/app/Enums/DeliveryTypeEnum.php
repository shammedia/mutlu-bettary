<?php

namespace Modules\Order\app\Enums;

enum DeliveryTypeEnum: string
{
    case HOME = 'home';
    case OFFICE = 'office';



    public  function getLabel(): string
    {
        return match ($this) {
            self::HOME => trans('home'),

            self::OFFICE => trans('office'),

        };
    }

}
