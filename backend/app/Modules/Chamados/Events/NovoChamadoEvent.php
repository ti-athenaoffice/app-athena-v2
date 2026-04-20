<?php

namespace App\Modules\Chamados\Events;

use App\Modules\Chamados\Models\Chamado;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NovoChamadoEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $chamado;

    /**
     * Create a new event instance.
     */
    public function __construct(Chamado $chamado)
    {
        $this->chamado = $chamado;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chamados.'.$this->chamado->setor_solicitado->value),
        ];
    }

    public function broadcastAs()
    {
        return 'novo.chamado';
    }

    public function broadcastWith(): array
    {
        return $this->chamado->toArray();
    }
}
