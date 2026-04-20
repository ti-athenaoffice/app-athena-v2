<?php

namespace App\Modules\Auth\Services;

use App\Modules\Auth\Models\Usuario;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UsuarioService
{
    public function listarUsuarios(int $perPage = 20): LengthAwarePaginator
    {
        return Usuario::query()
            ->paginate($perPage);
    }

    public function obterUsuarioPorId(int $id): Usuario
    {
        return Usuario::query()
            ->findOrFail($id);
    }

    public function criarUsuario(array $dados): Usuario
    {
        return Usuario::create([
            'nome' => $dados['nome'],
            'email' => $dados['email'],
            'senha' => Hash::make($dados['senha']),
            'setor' => $dados['setor'],
        ]);
    }

    public function editarUsuario(int $id, array $dados): Usuario
    {
        $usuario = $this->obterUsuarioPorId($id);
        if (empty($dados['senha'])) {
            unset($dados['senha']);
        } else {
            $dados['senha'] = Hash::make($dados['senha']);
        }

        $usuario->update($dados);
        return $usuario;
    }

    public function apagarUsuario(int $id): void
    {
        $usuario = $this->obterUsuarioPorId($id);
        $usuario->delete();
    }
}
