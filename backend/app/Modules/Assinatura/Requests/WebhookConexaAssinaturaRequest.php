<?php

namespace App\Modules\Assinatura\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WebhookConexaAssinaturaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'amount' => 'required',
            'customer' => 'required|array',
            'customer.id' => 'required',
            'customer.name' => 'required',
            'customer.type' => 'required',
            'customer.document' => 'required',
            'planName' => 'required|string',
            'companyId' => 'required',
            'startDate' => 'required|date',
            'contractId' => 'required',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
