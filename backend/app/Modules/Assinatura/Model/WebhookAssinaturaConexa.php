<?php

namespace App\Modules\Assinatura\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'payload',
])]
class WebhookAssinaturaConexa extends Model
{
    protected $casts = [
        'payload' => 'array',
    ];
}
