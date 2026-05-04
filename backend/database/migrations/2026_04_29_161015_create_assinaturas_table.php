<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('assinaturas', function (Blueprint $table) {
            $table->id();

            $table->string("cliente_id")->nullable();
            $table->string("razao_social_unidade")->nullable();
            $table->string("nome_unidade")->nullable();
            $table->string("cnpj_unidade")->nullable();
            $table->string("cidade_unidade")->nullable();
            $table->string("estado_unidade")->nullable();
            $table->string("cep_unidade")->nullable();
            $table->string("endereco_unidade")->nullable();

            $table->string("razao_social_cliente")->nullable();
            $table->string("cpf_cnpj_cliente")->nullable();
            $table->string("email_cliente")->nullable();
            $table->string("plano")->nullable();

            $table->date("data_atual")->nullable();

            $table->boolean("foi_enviado_documentos")->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assinaturas');
    }
};
