<?php

namespace App\Modules\Assinatura\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListarAssinaturasRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "email_cliente" => "nullable|string"
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
