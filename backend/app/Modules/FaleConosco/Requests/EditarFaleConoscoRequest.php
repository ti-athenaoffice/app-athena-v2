<?php

namespace App\Modules\FaleConosco\Requests;

use App\Core\Enums\StatusFaleConosco;
use App\Core\Enums\Sites;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditarFaleConoscoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'observacoes' => ['sometimes', 'nullable', 'string'],
            'status' => ['sometimes', 'required', Rule::enum(StatusFaleConosco::class)],
        ];
    }
}
