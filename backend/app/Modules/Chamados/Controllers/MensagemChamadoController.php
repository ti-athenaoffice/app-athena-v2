<?php

namespace App\Modules\Chamados\Controllers;

use App\Modules\Chamados\Events\NovaMensagemChamadoEvent;
use App\Modules\Chamados\Requests\CriarMensagemChamadoRequest;
use App\Modules\Chamados\Services\MensagemChamadoService;

class MensagemChamadoController
{
    public function __construct(private MensagemChamadoService $mensagemChamadoService) {}

    public function listarMensagensPorChamadoId(int $id)
    {
        return $this->mensagemChamadoService->listarMensagensPorChamadoId($id);
    }

    public function criarMensagem(CriarMensagemChamadoRequest $request)
    {
        $dados = $request->validated();
        $dados['usuario_id'] = $request->user()->id;
        $mensagem = $this->mensagemChamadoService->criarMensagem($dados);
        event(new NovaMensagemChamadoEvent($mensagem));
        return $mensagem;
    }
}
