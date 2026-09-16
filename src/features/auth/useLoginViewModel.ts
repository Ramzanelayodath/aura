import { useEffect, useState } from 'react';
import { loginUser } from './authSlice';
import { useAuthViewModel } from './useAuthViewModel';

export type Tab = 'signIn' | 'createAccount';

/**
 * View model for LoginScreen.
 * Owns all form/UI state and talks to AuthViewModel for the actual
 * sign-in call, so the screen stays pure presentation.
 */
export function useLoginViewModel() {
  const { isLoading, error: authError, login, clearError } = useAuthViewModel();

  const [tab, setTab] = useState<Tab>('signIn');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  const showSnackbar = (message: string) =>
    setSnackbar({ visible: true, message });

  useEffect(() => {
    if (authError) {
      showSnackbar(authError);
    }
  }, [authError]);

  const onChangeUsername = (text: string) => {
    setUsername(text);
    if (usernameError) {
      setUsernameError('');
    }
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const validate = () => {
    const trimmedUsername = username.trim();
    let nextUsernameError = '';
    let nextPasswordError = '';

    if (!trimmedUsername) {
      nextUsernameError = 'Username is required.';
    }

    if (!password) {
      nextPasswordError = 'Password is required.';
    }

    setUsernameError(nextUsernameError);
    setPasswordError(nextPasswordError);

    return !nextUsernameError && !nextPasswordError;
  };

  const handleSignIn = async () => {
    if (isLoading) {
      return;
    }
    if (!validate()) {
      showSnackbar('Please fix the highlighted fields and try again.');
      return;
    }
    clearError();
    const result = await login({ username: username.trim(), password });
    if (loginUser.fulfilled.match(result)) {
      showSnackbar('Signed in successfully.');
    }
  };

  const dismissSnackbar = () => setSnackbar(s => ({ ...s, visible: false }));

  return {
    tab,
    setTab,
    username,
    password,
    showPassword,
    rememberMe,
    usernameError,
    passwordError,
    snackbar,
    isLoading,
    authError,
    onChangeUsername,
    onChangePassword,
    setShowPassword,
    setRememberMe,
    handleSignIn,
    dismissSnackbar,
  };
}
