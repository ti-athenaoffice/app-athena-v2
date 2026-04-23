<?php

namespace App\Modules\Auth\Routes;

use App\Modules\Auth\Controllers\AuthController;
use App\Modules\Auth\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('/usuarios')
        ->name('usuarios.')
        ->group(function () {
            Route::get('/', [UsuarioController::class, 'listarUsuarios'])->name('listarUsuarios');
            Route::post('/', [UsuarioController::class, 'criarUsuario'])->name('criarUsuario');
            Route::put('/{id}', [UsuarioController::class, 'editarUsuario'])->name('editarUsuario');
            Route::delete('/{id}', [UsuarioController::class, 'apagarUsuario'])->name('apagarUsuario');
        });
});
