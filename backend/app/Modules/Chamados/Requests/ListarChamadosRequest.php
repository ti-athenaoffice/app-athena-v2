<?php

namespace App\Modules\Chamados\Requests;

use App\Core\Enums\PrioridadeChamado;
use App\Core\Enums\StatusChamado;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListarChamadosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'protocolo' => ['nullable', 'string'],
            'visualizar' => [
                'nullable',
                Rule::in(['PARA_MEU_SETOR', 'DO_MEU_SETOR']),
            ],
            'status' => ['nullable', Rule::enum(StatusChamado::class)],
            'prioridade' => ['nullable', Rule::enum(PrioridadeChamado::class)],
        ];
    }
}
