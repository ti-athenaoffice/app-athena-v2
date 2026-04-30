<?php

namespace App\Modules\Chamados\Routes;

use App\Modules\Chamados\Controllers\ChamadoController;
use App\Modules\Chamados\Controllers\MensagemChamadoController;
use Illuminate\Support\Facades\Route;

Route::prefix("/chamados")
->middleware('auth:sanctum')
->name("chamados.")
->group(function () {
    Route::get("/", [ChamadoController::class, "listarChamados"])
        ->name("listarChamados")
        ->middleware("permission:chamado.listar");
    Route::get("/{id}", [ChamadoController::class, "listarChamadoPorId"])
        ->name("listarChamadoPorId")
        ->middleware("permission:chamado.listar");
    Route::post("/", [ChamadoController::class, "criarChamado"])
        ->name("criarChamado")
    ->middleware("permission:chamado.criar");
    Route::put("/{id}", [ChamadoController::class, "editarChamado"])
        ->name("editarChamado")
        ->middleware("permission:chamado.editar");
    Route::put("/{id}/status", [ChamadoController::class, "alterarStatus"])
        ->name("alterarStatus")
        ->middleware("permission:chamado.editar");;
    Route::put("/{id}/adicionar-prazo", [ChamadoController::class, "adicionarPrazoNoChamado"])
        ->name("adicionarPrazoNoChamado")
        ->middleware("permission:chamado.editar");;
    Route::delete("/{id}", [ChamadoController::class, "apagarChamado"])
        ->name("apagarChamado")
        ->middleware("permission:chamado.deletar");
});

Route::prefix("/chamados")
->middleware('auth:sanctum')
->name("chamado.mensagens.")
->group(function () {
    Route::get("/{id}/mensagens", [MensagemChamadoController::class, "listarMensagensPorChamadoId"])
        ->name("listarMensagensPorChamadoId")
        ->middleware("permission:mensagem-chamado.listar");
    Route::post("/mensagem", [MensagemChamadoController::class, "criarMensagem"])
        ->name("criarMensagem")
        ->middleware("permission:mensagem-chamado.criar");
});
