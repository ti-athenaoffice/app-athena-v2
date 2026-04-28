<?php

namespace App\Modules\FaleConosco\Requests;

use App\Core\Enums\StatusFaleConosco;
use App\Core\Enums\Sites;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarFaleConoscoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'telefone' => ['required', 'string', 'max:20'],
            'assunto' => ['required', 'string', 'max:255'],
            'mensagem' => ['required', 'string'],
            'remetente' => ['required', Rule::enum(Sites::class)],
            'cidade' => ['nullable', 'string', 'max:255'],
            'servico' => ['nullable', 'string', 'max:255'],
        ];
    }
}
