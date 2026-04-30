import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginCredentials, AuthResponse } from "../types/authTypes";
import { processarLogin, processarLogout } from "../../../modules/auth/service/authService";
import api from "../../service/api";

const initialState: AuthState = {
  usuario: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isInitialized: false,
};

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return { token: null, isAuthenticated: false };
    }

    try {
      const response = await api.get('/user');

      if (response.status === 200) {
        return {
          token,
          isAuthenticated: true,
          user: response.data.usuario
        };
      } else {
        return { token: null, isAuthenticated: false };
      }
    } catch (error: any) {
      return { token: null, isAuthenticated: false };
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response: AuthResponse = await processarLogin(credentials);
      if (response.access_token) {
        localStorage.setItem("authToken", response.access_token);
      }
      return response;
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error || "Erro ao fazer login");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await processarLogout();
      localStorage.removeItem("authToken");
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
      state.usuario = action.payload.usuario;
      state.token = action.payload.token || null;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token || null;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.usuario = action.payload.user || null;
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
        state.usuario = action.payload.usuario;
        state.token = action.payload.access_token || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.token = null;
        state.usuario = null;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.usuario = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.usuario = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
