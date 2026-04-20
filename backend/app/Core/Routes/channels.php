<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chamados.{setor_solicitado}', function ($user, $setor_solicitado) {
    return strtolower($setor_solicitado) === strtolower($user->setor->value);
});

Broadcast::channel('mensagens-chamados.{setor_solicitado}.{setor_solicitante}', function ($user, $setor_solicitado, $setor_solicitante) {
    return strtolower($user->setor->value) === strtolower($setor_solicitado) ||
           strtolower($user->setor->value) === strtolower($setor_solicitante);
});
