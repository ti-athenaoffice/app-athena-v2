<?php

namespace App\Modules\Auth\Services;

use App\Modules\Auth\Models\Usuario;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UsuarioService
{
    public function listarUsuarios(array $filtros, int $perPage = 20): LengthAwarePaginator
    {
        return Usuario::query()
            ->with('roles')
            ->when($filtros['nome'] ?? null, function ($query, $filtrosetor) {
                $query->where('nome', 'ilike', "%{$filtrosetor}%");
            })
            ->when($filtros['setor'] ?? null, function ($query, $filtrosetor) {
                $query->where('setor', $filtrosetor);
            })
            ->paginate($perPage);
    }

    public function obterUsuarioPorId(int $id): Usuario
    {
        return Usuario::query()
            ->findOrFail($id);
    }

    public function criarUsuario(array $dados): Usuario
    {
        $roles = $dados['roles'] ?? [];
        unset($dados['roles']);

        $usuario = Usuario::create([
            'nome' => $dados['nome'],
            'email' => $dados['email'],
            'senha' => Hash::make($dados['senha']),
            'setor' => $dados['setor'],
        ]);

        $usuario->syncRoles($roles);
        return $usuario->refresh();
    }

    public function editarUsuario(int $id, array $dados): Usuario
    {
        $usuario = $this->obterUsuarioPorId($id);

        $roles = $dados['roles'] ?? [];
        unset($dados['roles']);

        unset($dados['setores_permitidos']);

        if (empty($dados['senha'])) {
            unset($dados['senha']);
        } else {
            $dados['senha'] = Hash::make($dados['senha']);
        }

        $usuario->update($dados);
        $usuario->syncRoles($roles);
        return $usuario->refresh();
    }

    public function apagarUsuario(int $id): void
    {
        $usuario = $this->obterUsuarioPorId($id);
        $usuario->delete();
    }
}
