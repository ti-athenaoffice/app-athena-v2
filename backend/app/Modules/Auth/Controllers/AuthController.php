<?php

namespace App\Modules\Auth\Controllers;

use App\Modules\Auth\Requests\LoginRequest;
use App\Modules\Auth\Requests\RegisterRequest;
use App\Modules\Auth\Services\AuthService;
use App\Modules\Auth\Services\UsuarioService;
use Illuminate\Http\Request;

class AuthController
{
    public function __construct(
        private AuthService $authService,
        private UsuarioService $usuarioService
    ) {}

    public function register(RegisterRequest $request)
    {
        $dados = $request->validated();
        $user = $this->usuarioService->criarUsuario($dados);
        $token = $this->authService->gerarToken($user);

        return response()->json([
            'message' => 'UsuÃ¡rio registrado!',
            'usuario' => $user,
            'access_token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $dados = $request->validated();
        $user = $this->authService->registrarLogin($dados);
        $token = $this->authService->gerarToken($user);

        return response()->json([
            'message' => 'Login realizado com sucesso!',
            'usuario' => $user,
            'access_token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
}
