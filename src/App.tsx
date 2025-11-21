import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import StepGuard from '@/components/routes/StepGuard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import OnboardingLayout from '@/pages/Onboarding/OnboardingLayout';
import Profile from '@/pages/Onboarding/Profile';
import FavoriteSongs from '@/pages/Onboarding/FavoriteSongs';
import PaymentInfo from '@/pages/Onboarding/PaymentInfo';
import Success from '@/pages/Onboarding/Success';
import { getFirstStepPath } from '@/config/routes';

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

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Onboarding flow with nested routes */}
        <Route path="/onboarding" element={<OnboardingLayout />}>
          {/* Redirect to first step when accessing /onboarding */}
          <Route
            index
            element={<Navigate to={`/onboarding/${getFirstStepPath()}`} replace />}
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
