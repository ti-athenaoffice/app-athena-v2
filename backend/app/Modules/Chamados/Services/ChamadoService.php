<?php

namespace App\Modules\Chamados\Services;

use App\Core\Enums\Setores;
use App\Core\Enums\StatusChamado;
use App\Modules\Chamados\Models\Chamado;
use Carbon\Carbon;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;

class ChamadoService
{
    public function listarChamados(array $filtros, Setores $setorSolicitante, int $perPage = 20): LengthAwarePaginator
    {
        return Chamado::query()
            ->when($filtros['visualizar'] ?? 'PARA_MEU_SETOR', function ($query) use ($filtros, $setorSolicitante) {
                if (($filtros['visualizar'] ?? 'PARA_MEU_SETOR') === 'PARA_MEU_SETOR') {
                    $query->where('setor_solicitado', $setorSolicitante);
                } else {
                    $query->where('setor_solicitante', $setorSolicitante);
                }
            })
            ->when($filtros['protocolo'] ?? null, function ($query, $protocolo) {
                $query->where('id', 'like', "%{$protocolo}%");
            })
            ->when($filtros['setor_solicitado'] ?? null, function ($query, $setor) {
                $query->where('setor_solicitado', $setor);
            })
            ->when($filtros['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($filtros['prioridade'] ?? null, function ($query, $prioridade) {
                $query->where('prioridade', $prioridade);
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function obterChamadoPorId(int $id): Chamado
    {
        return Chamado::query()
            ->findOrFail($id);
    }

    public function obterChamadoPorUserIdAndId(int $id, int $userId): Chamado
    {
        return Chamado::query()
            ->where('usuario_id', $userId)
            ->findOrFail($id);
    }

    public function criarChamado(array $dados, int $userId): Chamado
    {
        return Chamado::create([
            'usuario_id' => $userId,
            'nome_funcionario' => $dados['nome_funcionario'] ?? null,
            'nome_funcionario_requisitado' => $dados['nome_funcionario_requisitado'] ?? null,
            'titulo' => $dados['titulo'] ?? null,
            'status' => $dados['status'] ?? null,
            'prioridade' => $dados['prioridade'] ?? null,
            'setor_solicitante' => $dados['setor_solicitante'] ?? null,
            'setor_solicitado' => $dados['setor_solicitado'] ?? null,
            'descricao' => $dados['descricao'] ?? null,
            'nome_funcionario_responsavel' => $dados['nome_funcionario_responsavel'] ?? null,
            'prazo_estimado_finalizacao' => $dados['prazo_estimado_finalizacao'] ?? null,
            'data_inicio_processo' => $dados['data_inicio_processo'] ?? null,
            'data_fim_processo' => $dados['data_fim_processo'] ?? null,
        ]);
    }

    public function editarChamado(array $dados, int $id, int $userId): Chamado
    {
        $chamado = $this->obterChamadoPorUserIdAndId($id, $userId);
        if($chamado->status === StatusChamado::EM_ANDAMENTO) {
            throw new Exception("O chamado não pode ser alterado pois já está em andamento");
        }
        $chamado->update($dados);
        return $chamado->fresh();
    }

    public function adicionarPrazoNoChamado(int $id, Carbon $prazo, string $nomeFuncionarioResponsavel)
    {
        $chamado = $this->obterChamadoPorId($id);
        $chamado->prazo_estimado_finalizacao = $prazo;
        $chamado->nome_funcionario_responsavel = $nomeFuncionarioResponsavel;
        $chamado->update();
        return $chamado->fresh();
    }

    // TODO: to add validation for setor
    public function alterarStatus(int $id, array $dados): Chamado
    {
        $chamado = $this->obterChamadoPorId($id);
        $novoStatus = StatusChamado::tryFrom($dados['status']);
        switch ($novoStatus) {
            case StatusChamado::EM_ANDAMENTO:
                if (! $chamado->data_inicio_processo) {
                    $chamado->data_inicio_processo = now();
                }
                $chamado->nome_funcionario_responsavel = $dados['nome_funcionario_responsavel'] ?? null;
                $chamado->data_fim_processo = null;
                break;
            case StatusChamado::CONCLUIDO:
                $chamado->data_fim_processo = now();
                $chamado->nome_funcionario_responsavel = $dados['nome_funcionario_responsavel'] ?? null;
                break;
            case StatusChamado::CANCELADO:
                $chamado->data_fim_processo = now();
                if (! $chamado->data_fim_processo) {
                    $chamado->data_fim_processo = now();
                }
                break;
            case StatusChamado::PENDENTE:
                break;
        }
        $chamado->status = $novoStatus;
        $chamado->update();
        return $chamado->fresh();
    }

    public function apagarChamado(int $id, int $userId): void
    {
        $chamado = $this->obterChamadoPorUserIdAndId($id, $userId);
        $chamado->delete();
    }
}
