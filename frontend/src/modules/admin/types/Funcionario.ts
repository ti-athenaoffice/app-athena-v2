export interface Funcionario {
  id?: number;
  nome: string;
  email: string;
  setor: string;
  senha?: string;
  created_at?: Date;
  updated_at?: Date;
}
