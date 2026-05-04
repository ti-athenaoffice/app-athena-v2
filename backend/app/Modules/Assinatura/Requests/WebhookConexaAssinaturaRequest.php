<?php

namespace App\Modules\Assinatura\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WebhookConexaAssinaturaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            // Básico
            'amount' => 'required|numeric',

            // Customer
            'customer' => 'required|array',
            'customer.id' => 'required',
            'customer.name' => 'required|string',
            'customer.type' => 'required|string',
            'customer.document' => 'required|string',
            'customer.tradeName' => 'nullable|string',

            // Documento (link do contrato)
            'document' => 'nullable|array',
            'document.url' => 'nullable|url',
            'document.token' => 'nullable|string',
            'document.platform' => 'nullable|string',

            // Progresso de assinatura
            'signatureProgress' => 'nullable|array',
            'signatureProgress.total' => 'nullable|integer',
            'signatureProgress.signed' => 'nullable|integer',
            'signatureProgress.status' => 'nullable|string',
            'signatureProgress.percentage' => 'nullable|numeric',

            // Plano
            'planName' => 'required|string',

            // Empresa / contrato
            'companyId' => 'required',
            'contractId' => 'required',

            // Datas
            'startDate' => 'required|date',

            // Signatários
            'currentSigners' => 'nullable|array',
            'currentSigners.*.name' => 'nullable|string',
            'currentSigners.*.email' => 'nullable|email',
            'currentSigners.*.phone' => 'nullable|string',
            'currentSigners.*.signedAt' => 'nullable|date',

            // Pagamento
            'paymentFrequency' => 'nullable|string',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
