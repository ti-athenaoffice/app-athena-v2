<?php

namespace App\Core\Integrations;

class ConexaIntegration
{

    private function fazerRequisicao(string $method, string $endpoint, array $payload = [], array $headers = [])
    {
        $baseUrl = config("services.conexa.url");
        $token = config("services.conexa.token");
        $response = \Http::withoutVerifying()
            ->withHeaders($headers)
            ->withToken($token)
            ->acceptJson()
            ->{$method}($baseUrl.$endpoint, $payload);

        if ($response->failed()) {
            throw new \Exception('Erro na requisição', $response->status());
        }

        return $response->json();
    }

    public function listarClientePorId(string $customerId)
    {
        $res = $this->fazerRequisicao('get', '/customer/'.$customerId);
        return $res;
    }

    public function listarUnidadePorId(string $companyId)
    {
        $res = $this->fazerRequisicao('get', '/company/'.$companyId);
        return $res;
    }
}
