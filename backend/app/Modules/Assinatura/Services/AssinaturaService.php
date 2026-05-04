<?php

namespace App\Modules\Assinatura\Services;

use App\Modules\Assinatura\Model\Assinatura;

class AssinaturaService
{
    public function listarAssinaturas(array $filtros = [], int $perPage = 20)
    {
        return Assinatura::query()
            ->when($filtros['email_cliente'] ?? null, function ($query, $emailCliente) {
                $query->where('email_cliente', 'like', "%{$emailCliente}%");
            })
            ->paginate($perPage);
    }

    public function registrarAssinatura()
    {

    }
}
