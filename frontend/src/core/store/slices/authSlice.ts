import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginCredentials, AuthResponse } from "../types/authTypes";
import { processarLogin, processarLogout } from "../../../modules/auth/service/authService";
import api from "../../service/api";

const initialState: AuthState = {
  user: null,
  token: null, // Não armazenamos token no localStorage quando usamos cookies
  isLoading: false,
  error: null,
  isAuthenticated: false, // Começamos como não autenticado, será verificado no initializeAuth
  isInitialized: false,
};

/**
 * Thunk para inicializar autenticação ao carregar a app
 * Verifica se o usuário está autenticado via cookies
 */
export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async () => {
    try {
      // Tenta fazer uma requisição para uma rota protegida para verificar se está autenticado
      // Se estiver autenticado, o cookie será enviado automaticamente
      const response = await api.get('/api/user');

      if (response.status === 200) {
        return {
          token: null, // Não armazenamos token quando usamos cookies
          isAuthenticated: true,
          user: response.data
        };
      } else {
        return { token: null, isAuthenticated: false };
      }
    } catch (error: any) {
      // Se der erro 401 ou erro de rede, usuário não está autenticado
      return { token: null, isAuthenticated: false };
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response: AuthResponse = await processarLogin(credentials);
      // O backend deve ter definido o cookie HTTP-only, não precisamos armazenar o token
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erro ao fazer login");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await processarLogout();
      // O backend deve ter limpado o cookie, não precisamos fazer nada no frontend
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erro ao fazer logout");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token || null;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers(builder) {
    builder
      // Initialize Auth
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token || null;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user || null;
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
