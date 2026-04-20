import echo from "../../../echo"
import type { Chamado } from "../types/Chamado"

type Callback<T> = (data: T) => void;
type ChamadoDeletadoEvent = {
  chamadoId: number;
};

export function entrarCanalChamados(setor: string | number) {
  return echo.private(`chamados.${setor}`);
}

export function ouvirNovoChamado(
    setor: string | number,
    callback: Callback<Chamado>
) {
  const channel = entrarCanalChamados(setor);

  channel.listen(".novo.chamado", (event: Chamado) => {
    callback(event);
  });
  return channel;
}

export function ouvirChamadoAtualizado(
    setor: string | number,
    callback: Callback<Chamado>
) {
  const channel = entrarCanalChamados(setor);

  channel.listen(".editar.chamado", (event: Chamado) => {
    callback(event);
  });
  return channel;
}

export function ouvirChamadoDeletado(
    setor: string | number,
    callback: Callback<ChamadoDeletadoEvent>
) {
  const channel = entrarCanalChamados(setor);

  channel.listen(".apagar.chamado", (event: ChamadoDeletadoEvent) => {
    console.log(event);
    callback(event);
  });

  return channel;
}

export function pararDeOuvirChamados(setor: string | number) {
  echo.leave(`chamados.${setor}`);
}