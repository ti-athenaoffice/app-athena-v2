<?php

namespace App\Modules\Assinatura\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    "cliente_id",
    "plano",
    "razao_social_unidade",
    "nome_unidade",
    "cnpj_unidade",
    "cidade_unidade",
    "estado_unidade",
    "cep_unidade",
    "endereco_unidade",
    "razao_social_cliente",
    "email_cliente",
    "cpf_cnpj_cliente",
    "data_atual"
])]
class Assinatura extends Model
{
}
