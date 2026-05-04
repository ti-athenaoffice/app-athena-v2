<?php

namespace App\Modules\Chamados\Routes;

use App\Modules\Assinatura\Controllers\AssinaturaController;
use Illuminate\Support\Facades\Route;


Route::prefix("/assinaturas")
->middleware('auth:sanctum')
->name("assinatura.")
->group(function () {
    Route::get("/", [AssinaturaController::class, "listarAssinaturas"])
        ->name("listarAssinaturas")
        ->middleware("permission:assinatura.listar");
    Route::post("/", [AssinaturaController::class, "regitrarAssinatura"])
        ->name("regitrarAssinatura");
});

Route::post("/webhook-assinatura", [AssinaturaController::class, "regitrarAssinatura"])->name("webhook-assinatura");
