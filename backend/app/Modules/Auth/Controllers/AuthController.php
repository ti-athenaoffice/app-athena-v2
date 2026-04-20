<?php

namespace App\Modules\Auth\Controllers;

use App\Modules\Auth\Requests\LoginRequest;
use App\Modules\Auth\Requests\RegisterRequest;
use App\Modules\Auth\Services\AuthService;
use App\Modules\Auth\Services\UsuarioService;
use Illuminate\Http\Request;

class AuthController
{
    public function __construct(private AuthService $authService,
                                private UsuarioService $usuarioService) {}

    public function register(RegisterRequest $request)
    {
        $dados = $request->validated();
        $user = $this->usuarioService->criarUsuario($dados);

        return response()->json([
            'message' => 'Usuário registrado!',
            'token' => $user->createToken('access_token')->plainTextToken,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        try {
            $dados = $request->validated();
            $usuario = $this->authService->registrarLogin($dados);
            $token = $this->authService->gerarToken($usuario);
            $response = response()->json([
                'message' => 'Login realizado com sucesso!',
                'usuario' => $usuario,
                'access_token' => $token,
            ]);
            return $response->cookie(
                'access_token',
                $token,
                60 * 24,
                '/',
                null,
                true,
                true
            );
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Token revogado']);
    }
}
