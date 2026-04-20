<?php

namespace App\Modules\Auth\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nome', 'descricao'])]
class Cargo extends Model
{
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}

