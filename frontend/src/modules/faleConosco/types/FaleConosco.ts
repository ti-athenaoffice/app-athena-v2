export interface FaleConosco {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    assunto: string;
    mensagem: string;
    remetente: string;
    cidade?: string;
    servico?: string;
    status: string;
    nome_funcionario_responsavel?: string;
    observacoes?: string;
    created_at?: string;
    updated_at?: string;
}
