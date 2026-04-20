<?php

namespace App\Modules\Chamados\Models;

use App\Modules\Auth\Models\Usuario;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'chamado_id',
    'usuario_id',
    'descricao'
])]
class MensagemChamado extends Model
{
    protected $table = 'mensagens_chamados';
    public function chamado()
    {
        return $this->belongsTo(Chamado::class, 'chamado_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, "usuario_id");
    }
}
