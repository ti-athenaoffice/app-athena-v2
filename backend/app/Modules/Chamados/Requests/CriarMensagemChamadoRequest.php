<?php

namespace App\Modules\Chamados\Requests;

use App\Core\Enums\StatusChamado;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarMensagemChamadoRequest extends FormRequest
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
            "chamado_id" => "required|integer|exists:chamados,id",
            "descricao" => "required|string",
        ];
    }
}
