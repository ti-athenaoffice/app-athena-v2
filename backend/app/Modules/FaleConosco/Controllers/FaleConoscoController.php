<?php

namespace App\Modules\FaleConosco\Controllers;

use App\Modules\FaleConosco\Models\FaleConsoco;
use App\Modules\FaleConosco\Requests\CriarFaleConoscoRequest;
use App\Modules\FaleConosco\Requests\EditarFaleConoscoRequest;
use App\Modules\FaleConosco\Requests\ListarFaleConoscoRequest;
use App\Modules\FaleConosco\Services\FaleConoscoService;

class FaleConoscoController
{
    public function __construct(private FaleConoscoService $faleConoscoService) {}


    public function listarMensagensFaleConosco(ListarFaleConoscoRequest $request)
    {
        $dados = $request->validated();
        return $this->faleConoscoService->listarMensagensFaleConosco($dados);
    }

    public function salvarMensagemFaleConosco(CriarFaleConoscoRequest $request): FaleConsoco
    {
        $dados = $request->validated();
        return $this->faleConoscoService->salvarMensagemFaleConosco($dados);
    }

    public function editarMensagemFaleConosco(int $id, EditarFaleConoscoRequest $request): FaleConsoco
    {
        $dados = $request->validated();
        return $this->faleConoscoService->editarMensagemFaleConosco($id, $dados, $request->user());
    }
}
