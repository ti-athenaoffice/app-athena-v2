<?php

namespace App\Modules\Chamados\Models;

use App\Core\Enums\PrioridadeChamado;
use App\Core\Enums\Setores;
use App\Core\Enums\StatusChamado;
use App\Modules\Auth\Models\Usuario;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'nome_funcionario',
    'nome_funcionario_requisitado',
    'titulo',
    'status',
    'prioridade',
    'setor_solicitante',
    'setor_solicitado',
    'descricao',
    'nome_funcionario_responsavel',
    'prazo_estimado_finalizacao',
    'data_inicio_processo',
    'data_fim_processo',
    'usuario_id',
])]
class Chamado extends Model
{
    public function mensagens(): HasMany
    {
        return $this->hasMany(MensagemChamado::class);
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    protected function casts(): array
    {
        return [
            'data_inicio_processo' => 'datetime',
            'data_fim_processo' => 'datetime',
            'prazo_estimado_finalizacao' => 'datetime',
            'status' => StatusChamado::class,
            'prioridade' => PrioridadeChamado::class,
            'setor_solicitante' => Setores::class,
            'setor_solicitado' => Setores::class,
        ];
    }
}
