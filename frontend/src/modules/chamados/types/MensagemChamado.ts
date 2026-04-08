
export default interface MensagemChamado {
    id?: number;
    usuario_id: number;
    chamado_id: number;
    descricao: string;
    usuario?: Usuario;
    created_at?: Date;
    updated_at?: Date;
}

type Usuario = {
  id: string;
  nome: string;
  setor: string;
};