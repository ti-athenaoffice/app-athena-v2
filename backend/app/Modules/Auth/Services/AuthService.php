<?php
namespace App\Modules\Auth\Services;

use App\Modules\Auth\Models\Usuario;
use Exception;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function registrarLogin(array $dados)
    {
        $user = Usuario::where('email', $dados["email"])->first();

        if (! $user || ! Hash::check($dados["senha"], $user->senha)) {
            throw new Exception("Credenciais inválidas");
        }
        return $user;
    }

    public function gerarToken(Usuario $user)
    {
        return $user->createToken('access_token')->plainTextToken;
    }
}
