<?php

namespace App\Modules\Chamados\Services;

use App\Modules\Chamados\Models\MensagemChamado;

class MensagemChamadoService
{
    public function listarMensagensPorChamadoId(int $chamadoId, int $perPage = 10)
    {
        return MensagemChamado::query()
            ->where('chamado_id', $chamadoId)
            ->with('usuario:id,nome,setor')
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
    }

    public function criarMensagem(array $dados)
    {
        return MensagemChamado::create($dados)
            ->load(['usuario:id,nome,setor', 'chamado']);
    }
}
