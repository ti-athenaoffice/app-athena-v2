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
        Schema::create('fale_conosco', function (Blueprint $table) {
            $table->id();
            $table->string("nome");
            $table->string("email");
            $table->string("telefone");
            $table->string("assunto");
            $table->string("mensagem");
            $table->enum("status", ["PENDENTE", "RESOLVIDO", "CANCELADO"]);
            $table->string("cidade")->nullable();
            $table->string("servico")->nullable();
            $table->enum("remetente", ["A1", "ATHENA", "ICELANDS", "NERI", "SUA_OFICINA_VIRTUAL", "NERI_INTERNACIONAL"]);
            $table->string("nome_funcionario_responsavel")->nullable();
            $table->string("observacoes")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fale_conosco');
    }
};
