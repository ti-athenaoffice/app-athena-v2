<?php

namespace App\Modules\Assinatura\Controllers;

use App\Modules\Assinatura\Jobs\ProcessarAssinaturaJob;
use App\Modules\Assinatura\Model\WebhookAssinaturaConexa;
use App\Modules\Assinatura\Requests\ListarAssinaturasRequest;
use App\Modules\Assinatura\Requests\WebhookConexaAssinaturaRequest;
use App\Modules\Assinatura\Services\AssinaturaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

class AssinaturaController
{
    public function __construct(private AssinaturaService $assinaturaService) { }

    public function listarAssinaturas(ListarAssinaturasRequest $request): LengthAwarePaginator
    {
        $dados = $request->validated();
        return $this->assinaturaService->listarAssinaturas($dados,20);
    }

    public function regitrarAssinatura(WebhookConexaAssinaturaRequest $request): JsonResponse
    {
        $dados = $request->validated();
        logger()->info("Webhook do Conexa recebido ", [$dados]);

        WebhookAssinaturaConexa::create([
            'payload' => $dados
        ]);

        ProcessarAssinaturaJob::dispatch($dados);

        return response()->json([
            'message' => 'Assinatura enviada para processamento com sucesso'
        ], 200);
    }
}
