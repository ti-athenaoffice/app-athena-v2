<?php

namespace App\Modules\Auth\Requests;

use App\Core\Enums\Setores;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarUsuarioRequest extends FormRequest
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
            'nome' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                'unique:usuarios,email',
            ],
            'setor' => [
                'required',
                Rule::enum(Setores::class),
            ],
            'senha' => 'required|string|min:6',
            'roles' => 'sometimes|array',
        ];
    }
}
