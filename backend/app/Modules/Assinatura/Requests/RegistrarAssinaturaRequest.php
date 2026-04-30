<?php

namespace App\Modules\Assinatura\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistrarAssinaturaRequest extends FormRequest
{
    public function rules(): array
    {
        return [

        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
