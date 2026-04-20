<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chamados', function (Blueprint $table) {
            $table->id();
            $table->string("nome_funcionario");
            $table->string("nome_funcionario_requisitado")->nullable();
            $table->string("nome_funcionario_responsavel")->nullable();

            $table->string("titulo")->nullable();
            $table->text("descricao")->nullable();

            $table->foreignId("usuario_id")->constrained("usuarios")->onDelete("cascade");

            $table->enum("status", ["EM_ANDAMENTO", "PENDENTE", "CONCLUIDO", "CANCELADO"])->default("PENDENTE");
            $table->enum("prioridade", ["BAIXA", "MEDIA", "ALTA", "URGENTE"])->default("MEDIA");

            $table->enum("setor_solicitante", ["TI", "RH", "MARKETING", "JURIDICO", "FINANCEIRO", "ADMINISTRATIVO", "COMERCIAL", "CONTABILIDADE", "SECRETARIA"]);
            $table->enum("setor_solicitado", ["TI", "RH", "MARKETING", "JURIDICO", "FINANCEIRO", "ADMINISTRATIVO", "COMERCIAL", "CONTABILIDADE", "SECRETARIA"]);

            $table->timestamp("prazo_estimado_finalizacao")->nullable();
            $table->timestamp("data_inicio_processo")->nullable();
            $table->timestamp("data_fim_processo")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chamados');
    }
};
