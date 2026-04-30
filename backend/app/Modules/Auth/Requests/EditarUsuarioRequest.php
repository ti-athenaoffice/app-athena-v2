<?php

namespace App\Modules\Auth\Requests;

use App\Core\Enums\Setores;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditarUsuarioRequest extends FormRequest
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
        $usuarioId = $this->route('id');
        return [
            "nome" => "sometimes|string|max:255",
            "email" => [
                "sometimes",
                "email",
                "max:255",
                Rule::unique('usuarios', 'email')->ignore($usuarioId),
            ],
            "setor" => [
                "sometimes",
                Rule::enum(Setores::class),
            ],
            "senha" => "nullable|min:6",
            "roles" => "sometimes|array",
        ];
    }
}
