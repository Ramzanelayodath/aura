import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { login, type LoginRequest, type LoginResponse } from '../../api/authApi';
import { clearAuthSession, loadAuthSession, saveAuthSession } from './authStorage';

type AuthUser = Omit<LoginResponse, 'accessToken' | 'refreshToken'>;

export type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isBootstrapping: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
  isBootstrapping: true,
};

const applySession = (state: AuthState, session: LoginResponse) => {
  const { accessToken, refreshToken, ...user } = session;
  state.user = user;
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.status = 'succeeded';
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const session = await login(payload);
    await saveAuthSession(session);
    return session;
  } catch (err: any) {
    const message =
      err?.response?.data?.message ??
      err?.message ??
      'Unable to sign in. Please try again.';
    return rejectWithValue(message);
  }
});

// Reads whatever session was saved on a previous run, so the app can
// skip straight to HomeScreen instead of asking the user to log in again.
export const restoreSession = createAsyncThunk('auth/restoreSession', loadAuthSession);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      Object.assign(state, initialState, { isBootstrapping: false });
      clearAuthSession();
    },
    clearAuthError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        applySession(state, action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to sign in. Please try again.';
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        if (action.payload) {
          applySession(state, action.payload);
        }
        state.isBootstrapping = false;
      })
      .addCase(restoreSession.rejected, state => {
        state.isBootstrapping = false;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
