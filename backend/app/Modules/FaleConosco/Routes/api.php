<?php
namespace App\Modules\FaleConosco\Routes;

use App\Modules\FaleConosco\Controllers\FaleConoscoController;
use Illuminate\Support\Facades\Route;

Route::prefix("/fale-conosco")
    ->middleware('auth:sanctum')
    ->name("fale-conosco.")
    ->group(function () {
        Route::get("/", [FaleConoscoController::class, "listarMensagensFaleConosco"])->name("listarMensagensFaleConosco");
        Route::post("/", [FaleConoscoController::class, "salvarMensagemFaleConosco"])->name("salvarMensagemFaleConosco");
        Route::put("/{id}", [FaleConoscoController::class, "editarMensagemFaleConosco"])->name("editarMensagemFaleConosco");
    });
