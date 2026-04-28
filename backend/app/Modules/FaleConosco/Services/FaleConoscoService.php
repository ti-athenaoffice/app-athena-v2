<?php

namespace App\Modules\FaleConosco\Services;

use App\Core\Enums\StatusFaleConosco;
use App\Modules\Auth\Models\Usuario;
use App\Modules\FaleConosco\Models\FaleConsoco;

class FaleConoscoService
{
    public function listarMensagensFaleConosco(array $dados, int $perPage = 15)
    {
        return FaleConsoco::query()
            ->when($dados['status'] ?? null, fn($query, $status) =>
            $query->where('status', $status)
            )
            ->when($dados['remetente'] ?? null, fn($query, $remetente) =>
            $query->where('remetente', $remetente)
            )
            ->when($dados['nome'] ?? null, fn($query, $nome) =>
            $query->where('nome', 'ilike', "%{$nome}%")
            )
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function salvarMensagemFaleConosco(array $dados)
    {
        $dados['status'] = StatusFaleConosco::PENDENTE;
        return FaleConsoco::create($dados);
    }

    public function editarMensagemFaleConosco(int $id, array $dados, Usuario $usuario)
    {
        $mensagem = FaleConsoco::findOrFail($id);
        $dados['nome_funcionario_responsavel'] = $usuario->nome ?? null;
        $mensagem->update($dados);
        return $mensagem->fresh();
    }
}
