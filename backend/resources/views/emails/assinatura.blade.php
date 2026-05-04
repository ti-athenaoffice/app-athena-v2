<div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 30px;">

    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">

        <!-- Header -->
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">
                Athena Office
            </h1>
        </div>

        <!-- Conteúdo -->
        <div style="padding: 30px; color: #1f2937; line-height: 1.6;">

            <h2 style="color: #0f172a; margin-top: 0;">
                Assinatura concluída ✅
            </h2>

            <p>Olá, tudo bem?</p>

            <p>
                A assinatura do seu contrato foi concluída com sucesso.
            </p>

            <p>
                Em anexo, você encontrará a documentação referente ao seu
                <strong style="color: #0f172a;">
                    {{ $tipoEndereco ?? 'Endereço Fiscal/Comercial' }}
                </strong>.
            </p>

            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0;">
                    📌 <strong>Orientação importante:</strong><br>
                    Recomendamos que os documentos sejam encaminhados ao seu contador para dar continuidade aos processos da sua empresa.
                </p>
            </div>

            <p>
                Caso precise de qualquer suporte, nossa equipe está à disposição para te ajudar.
            </p>

            <br>

            <p>
                Atenciosamente,<br>
                <strong style="color: #0f172a;">Equipe Athena Office</strong>
            </p>

        </div>

        <!-- Footer -->
        <div style="background-color: #0f172a; padding: 15px; text-align: center;">
            <p style="color: #cbd5f5; margin: 0; font-size: 12px;">
                © {{ date('Y') }} Athena Office • Todos os direitos reservados
            </p>
        </div>

    </div>
</div>
