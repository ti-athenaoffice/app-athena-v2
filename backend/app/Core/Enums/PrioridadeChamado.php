<?php

namespace App\Core\Enums;

enum PrioridadeChamado: string
{
    case BAIXA = 'BAIXA';
    case MEDIA = 'MEDIA';
    case ALTA = 'ALTA';
    case URGENTE = 'URGENTE';
}
