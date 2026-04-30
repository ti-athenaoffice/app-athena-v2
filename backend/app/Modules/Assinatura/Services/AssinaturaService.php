<?php

namespace App\Modules\Assinatura\Services;

use App\Modules\Assinatura\Model\Assinatura;

class AssinaturaService
{
    public function listarAssinaturas(int $perPage = 20)
    {
        return Assinatura::query()
            ->paginate($perPage);
    }

    public function registrarAssinatura()
    {

    }
}
