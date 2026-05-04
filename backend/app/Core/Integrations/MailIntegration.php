<?php

namespace App\Core\Integrations;

use Illuminate\Support\Facades\Mail;

class MailIntegration
{

    public function enviarEmail(string $email, string $tipoEndereco, string $subject, array $anexos)
    {
        Mail::send('emails.assinatura', ['tipoEndereco' => $tipoEndereco], function ($message) use ($email, $subject, $anexos) {
            $message->to($email)
                ->subject($subject);

            foreach ($anexos as $anexo) {
                $message->attach($anexo);
            }
        });
    }
}
