import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { LoginRequest } from '../../api/authApi';
import { clearAuthError, loginUser, logout, restoreSession } from './authSlice';

/**
 * The one place screens go to read or change auth state.
 * Keeps Redux (dispatch, selectors, action creators) out of the views.
 */
export function useAuthViewModel() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const login = useCallback(
    (payload: LoginRequest) => dispatch(loginUser(payload)),
    [dispatch],
  );
  const signOut = useCallback(() => dispatch(logout()), [dispatch]);
  const clearError = useCallback(() => dispatch(clearAuthError()), [dispatch]);
  const restore = useCallback(() => dispatch(restoreSession()), [dispatch]);

  return {
    user: auth.user,
    isAuthenticated: !!auth.accessToken,
    isLoading: auth.status === 'loading',
    isBootstrapping: auth.isBootstrapping,
    error: auth.error,
    login,
    logout: signOut,
    clearError,
    restoreSession: restore,
  };
}
