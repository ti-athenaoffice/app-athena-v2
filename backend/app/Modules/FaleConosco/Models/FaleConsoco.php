<?php

namespace App\Modules\FaleConosco\Models;

use App\Core\Enums\StatusFaleConosco;
use App\Core\Enums\Sites;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'nome',
    'email',
    'telefone',
    'assunto',
    'cidade',
    'status',
    'servico',
    'mensagem',
    'remetente',
    'nome_funcionario_responsavel',
    'observacoes'
])]
class FaleConsoco extends Model
{
    protected $table = 'fale_conosco';
    protected $casts = [
        'status' => StatusFaleConosco::class,
        'remetente' => Sites::class,
    ];
}
