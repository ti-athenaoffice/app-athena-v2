<?php

namespace App\Modules\Auth\Controllers;

use App\Modules\Auth\Requests\CriarUsuarioRequest;
use App\Modules\Auth\Requests\EditarUsuarioRequest;
use App\Modules\Auth\Requests\ListarUsuarioRequest;
use App\Modules\Auth\Services\UsuarioService;

class UsuarioController
{
    public function __construct(private UsuarioService $usuarioService) {}

    public function listarUsuarios(ListarUsuarioRequest $request)
    {
        $dados = $request->validated();
        return $this->usuarioService->listarUsuarios($dados);
    }

    public function criarUsuario(CriarUsuarioRequest $request)
    {
        $dados = $request->validated();
        return $this->usuarioService->criarUsuario($dados);
    }

    public function editarUsuario(EditarUsuarioRequest $request, int $id)
    {
        $dados = $request->validated();
        return $this->usuarioService->editarUsuario($id, $dados);
    }

    public function apagarUsuario(int $id) {
        $this->usuarioService->apagarUsuario($id);
    }
}
