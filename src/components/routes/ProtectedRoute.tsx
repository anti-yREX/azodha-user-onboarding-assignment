import { ReactNode } from 'react';
// TODO: Import Navigate from react-router-dom when implementing redirects
// import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protected route wrapper
 * TODO: Implement authentication and onboarding checks
 * 
 * Logic to implement:
 * - Check if user is logged in (from Redux/localStorage)
 * - If not logged in → redirect to /login
 * - If logged in but onboarding incomplete → redirect to /onboarding
 * - If logged in and onboarding complete → render children (Home page)
 */
function ProtectedRoute({ children }: ProtectedRouteProps) {
  // TODO: Get auth state from Redux
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isOnboardingComplete = useSelector(selectIsOnboardingComplete);
  
  // TODO: Implement redirect logic
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }
  // if (!isOnboardingComplete) {
  //   return <Navigate to="/onboarding" replace />;
  // }
  
  // For now, render children directly (no actual protection)
  return <>{children}</>;
}

export default ProtectedRoute;

