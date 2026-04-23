<?php

namespace App\Modules\Auth\Controllers;

use App\Modules\Auth\Requests\LoginRequest;
use App\Modules\Auth\Requests\RegisterRequest;
use App\Modules\Auth\Services\AuthService;
use App\Modules\Auth\Services\UsuarioService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $dados = $request->validated();

        if (! Auth::attempt([
            'email' => $dados['email'],
            'password' => $dados['senha'],
        ])) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Login realizado com sucesso!',
            'usuario' => Auth::user(),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
}
