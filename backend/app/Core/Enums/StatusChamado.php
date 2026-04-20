<?php

namespace App\Core\Enums;

enum StatusChamado: string
{
    case EM_ANDAMENTO = 'EM_ANDAMENTO';
    case PENDENTE = 'PENDENTE';
    case CONCLUIDO = 'CONCLUIDO';
    case CANCELADO = 'CANCELADO';
}
