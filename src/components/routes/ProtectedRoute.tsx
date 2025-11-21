import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/authSlice';
import { selectIsUserOnboardingDone } from '@/store/onboardingDataSlice';
import { getFirstStepPath } from '@/config/routes';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protected route wrapper
 * 
 * Logic:
 * - Check if user is logged in (from Redux/localStorage)
 * - If not logged in → redirect to /login
 * - If logged in but onboarding incomplete:
 *   - If already on onboarding route → allow rendering (for OnboardingLayout)
 *   - Otherwise → redirect to /onboarding/profile
 * - If logged in and onboarding complete → render children (Home page)
 */
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isUserOnboardingDone = useAppSelector(selectIsUserOnboardingDone);
  const location = useLocation();
  const isOnboardingRoute = location.pathname.startsWith('/onboarding');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isUserOnboardingDone) {
    // Allow onboarding routes to render when onboarding is not done
    if (isOnboardingRoute) {
      return <>{children}</>;
    }
    // Redirect to onboarding if not already on an onboarding route
    return <Navigate to={`/onboarding/${getFirstStepPath()}`} replace />;
  }
  
  return <>{children}</>;
}

export default ProtectedRoute;

