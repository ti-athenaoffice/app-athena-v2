<?php

namespace App\Modules\Chamados\Controllers;

use App\Core\Enums\Setores;
use App\Core\Enums\StatusChamado;
use App\Modules\Chamados\Events\EditarChamadoEvent;
use App\Modules\Chamados\Events\NovoChamadoEvent;
use App\Modules\Chamados\Requests\AlterarStatusRequest;
use App\Modules\Chamados\Requests\CriarChamadoRequest;
use App\Modules\Chamados\Requests\EditarChamadoRequest;
use App\Modules\Chamados\Requests\ListarChamadosRequest;
use App\Modules\Chamados\Services\ChamadoService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChamadoController
{
    public function __construct(private ChamadoService $chamadoService) {}

    public function listarChamados(ListarChamadosRequest $request)
    {
        $filtros = $request->validated();
        $setorSolicitante = Setores::tryFrom($request->user()->setor->value);
        return $this->chamadoService->listarChamados($filtros, $setorSolicitante);
    }

    public function listarChamadoPorId(int $id)
    {
        return $this->chamadoService->obterChamadoPorId($id);
    }

    public function criarChamado(CriarChamadoRequest $request)
    {
        $dados = $request->validated();
        $dados['status'] = StatusChamado::PENDENTE;
        $dados['nome_funcionario'] = $request->user()->nome;
        $dados['setor_solicitante'] = Setores::tryFrom($request->user()->setor->value);
        $chamado = $this->chamadoService->criarChamado($dados, $request->user()->id);
        event(new NovoChamadoEvent($chamado));
        return $chamado;
    }

    public function editarChamado(EditarChamadoRequest $request, string $id)
    {
        $dados = $request->validated();
        $chamado = $this->chamadoService->editarChamado($dados, $id, $request->user()->id);
        event(new EditarChamadoEvent($chamado));
        return $chamado;
    }

    public function adicionarPrazoNoChamado(Request $request, string $id)
    {
        $dados = $request->validate([
            'prazo_estimado_finalizacao' => 'required|date|after_or_equal:now',
        ]);
        $prazo = Carbon::parse($dados['prazo_estimado_finalizacao']);
        $chamado = $this->chamadoService->adicionarPrazoNoChamado(
            $id,
            $prazo,
            $request->user()->nome
        );
        event(new EditarChamadoEvent($chamado));
        return $chamado;
    }

    public function alterarStatus(AlterarStatusRequest $request, string $id)
    {
        $dados = $request->validated();
        $dados['nome_funcionario_responsavel'] = $request->user()->nome;
        $chamado = $this->chamadoService->alterarStatus($id, $dados);
        event(new EditarChamadoEvent($chamado));
        return $chamado;
    }

    public function apagarChamado(Request $request, int $id): void
    {
        $this->chamadoService->apagarChamado($id, $request->user()->id);
    }
}
