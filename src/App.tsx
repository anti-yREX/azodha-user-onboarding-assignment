import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectFirstIncompleteStepPath } from '@/store/onboardingDataSlice';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import StepGuard from '@/components/routes/StepGuard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import OnboardingLayout from '@/pages/Onboarding/OnboardingLayout';
import Profile from '@/pages/Onboarding/Profile';
import FavoriteSongs from '@/pages/Onboarding/FavoriteSongs';
import PaymentInfo from '@/pages/Onboarding/PaymentInfo';
import Success from '@/pages/Onboarding/Success';

/**
 * Component that redirects to the first incomplete onboarding step
 */
function OnboardingRedirect() {
  const firstIncompleteStepPath = useAppSelector(selectFirstIncompleteStepPath);
  return <Navigate to={`/onboarding/${firstIncompleteStepPath}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page - protected route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Onboarding flow with nested routes */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingLayout />
            </ProtectedRoute>
          }
        >
          {/* Redirect to first incomplete step when accessing /onboarding */}
          <Route
            index
            element={<OnboardingRedirect />}
          />

          {/* Profile step */}
          <Route
            path="profile"
            element={
              <StepGuard stepPath="profile">
                <Profile />
              </StepGuard>
            }
          />

          {/* Favorite Songs step */}
          <Route
            path="favorite-songs"
            element={
              <StepGuard stepPath="favorite-songs">
                <FavoriteSongs />
              </StepGuard>
            }
          />

          {/* Payment Info step */}
          <Route
            path="payment-info"
            element={
              <StepGuard stepPath="payment-info">
                <PaymentInfo />
              </StepGuard>
            }
          />

          {/* Success step */}
          <Route
            path="success"
            element={
              <StepGuard stepPath="success">
                <Success />
              </StepGuard>
            }
          />
          <Route path="*" element={<OnboardingRedirect />} />
        </Route>
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
