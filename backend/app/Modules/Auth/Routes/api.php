<?php

namespace App\Modules\Auth\Routes;

use App\Modules\Auth\Controllers\AuthController;
use App\Modules\Auth\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;

Route::get('/roles', function () {
    return Role::select('id', 'name')->get();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/user', function (Request $request) {
        return response()->json([
            'usuario' => $request->user(),
            'permissions' => $request->user()->getAllPermissions()->pluck('name'),
        ]);
    });

    Route::prefix('/usuarios')
        ->name('usuarios.')
        ->middleware('auth:sanctum')
        ->group(function () {
            Route::get('/', [UsuarioController::class, 'listarUsuarios'])
                ->name('listarUsuarios')
                ->middleware('permission:usuario.listar');
            Route::post('/', [UsuarioController::class, 'criarUsuario'])
                ->name('criarUsuario')
                ->middleware('permission:usuario.criar');
            Route::put('/{id}', [UsuarioController::class, 'editarUsuario'])
                ->name('editarUsuario')
                ->middleware('permission:usuario.editar');
            Route::delete('/{id}', [UsuarioController::class, 'apagarUsuario'])
                ->name('apagarUsuario')
                ->middleware('permission:usuario.deletar');
        });
});
