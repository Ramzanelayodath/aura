import { useEffect } from 'react';
import { useAuthViewModel } from '../auth/useAuthViewModel';

/**
 * View model for SplashScreen: kicks off session restoration on mount
 * and reports whether the app is still deciding home vs. login.
 */
export function useSplashViewModel() {
  const { isBootstrapping, restoreSession } = useAuthViewModel();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return { isBootstrapping };
}
