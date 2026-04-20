<?php

namespace App\Modules\Chamados\Events;

use App\Modules\Chamados\Models\MensagemChamado;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NovaMensagemChamadoEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $mensagem;

    /**
     * Create a new event instance.
     */
    public function __construct(MensagemChamado $mensagem)
    {
        $this->mensagem = $mensagem;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, PrivateChannel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('mensagens-chamados.' . $this->mensagem->chamado->setor_solicitado->value . '.' . $this->mensagem->chamado->setor_solicitante->value),
        ];
    }

    public function broadcastAs(): string
    {
        return 'nova.mensagem.chamado';
    }

    public function broadcastWith(): array
    {
        return [
            'mensagem' => $this->mensagem->toArray(),
        ];
    }
}
