import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/authSlice';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protected route wrapper
 * 
 * Logic:
 * - Check if user is logged in (from Redux/localStorage)
 * - If not logged in → redirect to /login
 * - If logged in but onboarding incomplete → redirect to /onboarding
 * - If logged in and onboarding complete → render children (Home page)
 * 
 * Note: Onboarding completion check will be implemented when onboarding flow is added
 */
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // TODO: Check onboarding completion when onboarding flow is implemented
  // For now, if authenticated, redirect to onboarding
  // const isOnboardingComplete = useSelector(selectIsOnboardingComplete);
  // if (!isOnboardingComplete) {
  //   return <Navigate to={`/onboarding/${getFirstStepPath()}`} replace />;
  // }
  
  // For now, render children if authenticated
  // This will be updated when onboarding completion check is added
  return <>{children}</>;
}

export default ProtectedRoute;

