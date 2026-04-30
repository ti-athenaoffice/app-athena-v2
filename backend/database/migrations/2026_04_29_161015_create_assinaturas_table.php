<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('assinaturas', function (Blueprint $table) {
            $table->id();
            $table->string("plano");
            $table->string("email_cliente");
            $table->boolean("foiEnviadoDocumentos")->default(false);
            $table->string("empresa_id_conexa")->nullable();
            $table->string("cliente_id_conexa")->nullable();
            $table->string("numeroDocumentoCliente")->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assinaturas');
    }
};
