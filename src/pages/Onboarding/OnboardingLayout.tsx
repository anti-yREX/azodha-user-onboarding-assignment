import { Outlet, useLocation } from 'react-router-dom';
import Stepper from '@/components/OnBoarding/Stepper';
import { getStepIndex, getFirstStepPath } from '@/config/routes';

/**
 * Layout component for onboarding flow
 * Contains Stepper and renders child routes via Outlet
 * TODO: Integrate with Redux to get current step dynamically
 */
function OnBoardingLayout() {
  const location = useLocation();
  
  // Extract step path from location (e.g., '/onboarding/profile' -> 'profile')
  const stepPath = location.pathname.split('/onboarding/')[1] || getFirstStepPath();
  const currentStepIndex = getStepIndex(stepPath);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <Stepper currentStepIndex={currentStepIndex} />
        
        <div className="onboarding-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default OnBoardingLayout;

