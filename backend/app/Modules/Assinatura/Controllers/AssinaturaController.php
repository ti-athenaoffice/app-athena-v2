<?php

namespace App\Modules\Assinatura\Controllers;

use App\Modules\Assinatura\Requests\WebhookConexaAssinaturaRequest;
use App\Modules\Assinatura\Services\AssinaturaService;

class AssinaturaController
{
    public function __construct(private AssinaturaService $assinaturaService) { }

    public function listarAssinaturas()
    {
        return $this->assinaturaService->listarAssinaturas();
    }

    public function regitrarAssinatura(WebhookConexaAssinaturaRequest $request)
    {
        $dados = $request->validated();
        logger()->info("Webhook do Conexa recebido ", [$dados]);
        dd($request->all());
    }
}
