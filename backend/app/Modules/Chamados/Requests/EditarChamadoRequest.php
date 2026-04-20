<?php

namespace App\Modules\Chamados\Requests;

use App\Core\Enums\PrioridadeChamado;
use App\Core\Enums\Setores;
use App\Core\Enums\StatusChamado;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditarChamadoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->user()) {
            $this->merge([
                'setor_solicitante' => $this->user()->setor->value ?? $this->user()->setor,
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome_funcionario' => "nullable|string",
            'nome_funcionario_requisitado' => "nullable|string",
            'titulo' => "nullable|string",
            'status' => ["nullable", Rule::enum(StatusChamado::class)],
            'prioridade' => ["nullable", Rule::enum(PrioridadeChamado::class)],
            'setor_solicitante' => ['required', Rule::enum(Setores::class)],
            'setor_solicitado' => [
                'required',
                Rule::enum(Setores::class),
                'different:setor_solicitante',
            ],
            'descricao' => "nullable|string",
            'nome_funcionario_responsavel' => "nullable|string",
            'prazo_estimado_finalizacao' => "nullable|date_format:Y-m-d H:i:s",
            'data_inicio_processo' => "nullable|date_format:Y-m-d H:i:s",
            'data_fim_processo' => "nullable|date_format:Y-m-d H:i:s",
        ];
    }
}
