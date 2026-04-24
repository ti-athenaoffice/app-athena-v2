export interface Usuario {
  id: string;
  email: string;
  nome: string;
  setor?: string;
  setores_permitidos?: string[];
  roles?: string[];
  created_at: Date,
  updated_at: Date
}

export interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface AuthResponse {
  usuario: Usuario;
  access_token?: string;
}
