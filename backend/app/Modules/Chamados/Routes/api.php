<?php

namespace App\Modules\Chamados\Routes;

use App\Modules\Chamados\Controllers\ChamadoController;
use App\Modules\Chamados\Controllers\MensagemChamadoController;
use Illuminate\Support\Facades\Route;

Route::prefix("/chamados")
->middleware('auth:sanctum')
->name("chamados.")
->group(function () {
    Route::get("/", [ChamadoController::class, "listarChamados"])->name("listarChamados");
    Route::get("/{id}", [ChamadoController::class, "listarChamadoPorId"])->name("listarChamadoPorId");
    Route::post("/", [ChamadoController::class, "criarChamado"])->name("criarChamado");
    Route::put("/{id}", [ChamadoController::class, "editarChamado"])->name("editarChamado");
    Route::put("/{id}/status", [ChamadoController::class, "alterarStatus"])->name("alterarStatus");
    Route::put("/{id}/adicionar-prazo", [ChamadoController::class, "adicionarPrazoNoChamado"])->name("adicionarPrazoNoChamado");
    Route::delete("/{id}", [ChamadoController::class, "apagarChamado"])->name("apagarChamado");
});

Route::prefix("/chamados")
->middleware('auth:sanctum')
->name("chamado.mensagens.")
->group(function () {
    Route::get("/{id}/mensagens", [MensagemChamadoController::class, "listarMensagensPorChamadoId"])->name("listarMensagensPorChamadoId");
    Route::post("/mensagem", [MensagemChamadoController::class, "criarMensagem"])->name("criarMensagem");
});
