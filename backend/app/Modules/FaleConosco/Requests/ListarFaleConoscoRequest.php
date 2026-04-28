<?php

namespace App\Modules\FaleConosco\Requests;

use App\Core\Enums\StatusFaleConosco;
use App\Core\Enums\Sites;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListarFaleConoscoRequest extends FormRequest
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
            'status' => ['nullable', Rule::enum(StatusFaleConosco::class)],
            'remetente' => ['nullable', Rule::enum(Sites::class)],
            "nome" => "nullable|string",
        ];
    }
}
