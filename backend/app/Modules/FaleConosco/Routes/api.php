<?php
namespace App\Modules\FaleConosco\Routes;

use App\Modules\FaleConosco\Controllers\FaleConoscoController;
use Illuminate\Support\Facades\Route;

Route::prefix("/fale-conosco")
    ->middleware('auth:sanctum')
    ->name("fale-conosco.")
    ->group(function () {
        Route::get("/", [FaleConoscoController::class, "listarMensagensFaleConosco"])
            ->name("listarMensagensFaleConosco")
            ->middleware("permission:fale_conosco.listar");
        Route::put("/{id}", [FaleConoscoController::class, "editarMensagemFaleConosco"])
            ->name("editarMensagemFaleConosco")
            ->middleware("permission:fale_conosco.editar");
    });

Route::post("/fale-conosco", [FaleConoscoController::class, "salvarMensagemFaleConosco"])->name("salvarMensagemFaleConosco");
