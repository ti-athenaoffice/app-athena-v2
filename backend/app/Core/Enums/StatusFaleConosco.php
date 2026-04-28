<?php

namespace App\Core\Enums;

enum StatusFaleConosco: string
{
    case PENDENTE = 'PENDENTE';
    case RESOLVIDO = 'RESOLVIDO';
    case CANCELADO = 'CANCELADO';
}
