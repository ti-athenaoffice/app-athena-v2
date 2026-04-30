<?php

namespace App\Modules\Assinatura\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'plano',
    'email_cliente',
    'foiEnviadoDocumentos',
    'empresa_id_conexa',
    'cliente_id_conexa',
    'numeroDocumentoCliente',
])]
class Assinatura extends Model
{
    protected $casts = [
        'foiEnviadoDocumentos' => 'boolean',
    ];
}
