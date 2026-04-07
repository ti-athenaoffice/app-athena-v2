export interface User {
  id: string;
  email: string;
  nome: string;
  role?: string;
  setor?: {
    id: number;
    nome: string;
  };
}

export interface AuthState {
  user: User | null;
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
  user: User;
  token?: string; // Opcional quando usamos cookies
}
