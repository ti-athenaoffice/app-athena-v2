<?php

namespace App\Modules\Assinatura\Jobs;

use App\Core\Integrations\ConexaIntegration;
use App\Core\Integrations\MailIntegration;
use App\Core\Utils\Utils;
use App\Modules\Assinatura\Model\Assinatura;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use PhpOffice\PhpWord\TemplateProcessor;

class ProcessarAssinaturaJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private readonly array $dados)
    {
    }

    public function handle(ConexaIntegration $conexaIntegration, MailIntegration $mailIntegration): void
    {
        $cliente = $conexaIntegration->listarClientePorId($this->dados['customer']["id"]);
        $email = $cliente["emailsFinancialMessages"][0];
        $nomeDoPlano = $this->dados["planName"];
        $porcentagemAssinatura = $this->dados["signatureProgress"]["percentage"];

        if($porcentagemAssinatura != 100){
            logger()->info("Ambos ainda não assinaram a assinatura");
            return;
        }

        $unidade = $conexaIntegration->listarUnidadePorId($this->dados["companyId"]);

        $dados = [
            "cliente_id" => $cliente["customerId"],
            "email_cliente" => $email,
            "razao_social_unidade" => $unidade["legalName"],
            "nome_unidade" => $unidade["tradeName"],
            "cnpj_unidade" => Utils::formatarCnpj($unidade["cnpj"]),
            "cidade_unidade" => $unidade["address"]["city"],
            "estado_unidade" => $unidade["address"]["state"]["name"],
            "cep_unidade" => $unidade["address"]["zipCode"],
            "endereco_unidade" => $this->montarEnderecoUnidade($unidade["address"]),
            "razao_social_cliente" => $cliente["name"],
            "cpf_cnpj_cliente" => $cliente["legalPerson"]["cnpj"] ?? $cliente["naturalPerson"]["cpf"],
            "data_atual" => now()->format('d/m/Y'),
        ];

        if (stripos($nomeDoPlano, 'comercial') !== false) {
            $declaracaoComercial = $this->preencherDaDeclaracaoComercial($dados);

            $mailIntegration->enviarEmail(
                $email,
                "Endereço Comercial",
                "Assinatura concluída",
                [$declaracaoComercial]
            );
            $dados["plano"] = "Endereço Comercial";
            Assinatura::create($dados);
            unlink($declaracaoComercial);
            return;
        }

        $arquivos = $this->buscarArquivosPorNomeDoPlano($nomeDoPlano);
        $arquivo = array_values($arquivos)[0];
        $declaracaoFiscal = $this->preencherDaDeclaracaoFiscal($dados);

        $mailIntegration->enviarEmail(
            $email,
            "Endereço Fiscal",
            "Assinatura concluída",
            [
                storage_path('app/private/contratos_zip') . "/$arquivo",
                $declaracaoFiscal
            ]
        );
        $dados["plano"] = "Endereço Fiscal";
        Assinatura::create($dados);
        unlink($declaracaoFiscal);
    }

    private function buscarArquivosPorNomeDoPlano(string $nomeDoPlano): array
    {
        $diretorio = storage_path('app/private/contratos_zip');
        $arquivos = scandir($diretorio);
        return array_filter($arquivos, function ($arquivo) use ($nomeDoPlano) {
            return stripos($arquivo, $nomeDoPlano) !== false;
        });
    }

    private function preencherDaDeclaracaoFiscal(array $dados): string
    {
        $modelo =storage_path('app/private/contratos_zip/DECLARAÇÃO DE ENDEREÇO FISCAL.docx');
        $diretorio = storage_path('app/private/documentos_gerados');
        if (!\File::exists($diretorio)) {
            \File::makeDirectory($diretorio, 0777, true);
        }

        $nomeArquivo = 'declaracao_fiscal_' . uniqid() . '.docx';
        $saida = storage_path('app/private/documentos_gerados/' . $nomeArquivo);
        $template = new TemplateProcessor($modelo);

        foreach ($dados as $chave => $valor) {
            $template->setValue($chave, $valor ?? '');
        }

        $template->saveAs($saida);
        return $saida;
    }

    private function preencherDaDeclaracaoComercial(array $dados): string
    {
        $modelo =storage_path('app/private/contratos_zip/DECLARAÇÃO DE ENDEREÇO COMERCIAL.docx');
        $diretorio = storage_path('app/private/documentos_gerados');
        if (!\File::exists($diretorio)) {
            \File::makeDirectory($diretorio, 0777, true);
        }

        $nomeArquivo = 'declaracao_comercial_' . uniqid() . '.docx';
        $saida = storage_path('app/private/documentos_gerados/' . $nomeArquivo);
        $template = new TemplateProcessor($modelo);

        foreach ($dados as $chave => $valor) {
            $template->setValue($chave, $valor ?? '');
        }

        $template->saveAs($saida);
        return $saida;
    }

    private function montarEnderecoUnidade(array $address): string
    {
        $rua = $address['street'] ?? '';
        $numero = $address['number'] ?? '';
        $bairro = $address['neighborhood'] ?? '';
        $cidade = $address['city'] ?? '';
        $estado = $address['state']['abbreviation'] ?? '';
        $complemento = $address['additionalDetails'] ?? '';
        $endereco = "{$rua}, {$numero}";

        if (!empty($complemento)) {
            $endereco .= " - {$complemento}";
        }

        $endereco .= ", {$bairro}, {$cidade} - {$estado}";
        return $endereco;
    }
}
