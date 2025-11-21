import { ReactNode } from 'react';
// TODO: Import Navigate from react-router-dom when implementing redirects
// import { Navigate } from 'react-router-dom';
import { getStepIndex, getFirstStepPath } from '@/config/routes';

interface StepGuardProps {
  children: ReactNode;
  stepPath: string;
}

/**
 * Step guard component to validate step access
 * TODO: Implement step validation logic
 * 
 * Logic to implement:
 * - Get completed steps from Redux
 * - Allow access to completed steps + current step
 * - Redirect to first incomplete step if accessing future step
 */
function StepGuard({ children, stepPath }: StepGuardProps) {
  // TODO: Get onboarding state from Redux
  // const completedSteps = useSelector(selectCompletedSteps);
  // const currentStepIndex = getStepIndex(stepPath);
  // const isStepCompleted = completedSteps.includes(stepPath);
  // const isCurrentStep = currentStepIndex === completedSteps.length;
  
  // TODO: Implement step validation
  // if (currentStepIndex > completedSteps.length) {
  //   const firstIncompleteStep = getFirstIncompleteStep(completedSteps);
  //   return <Navigate to={`/onboarding/${firstIncompleteStep}`} replace />;
  // }
  
  // For now, render children directly (no actual validation)
  return <>{children}</>;
}

export default StepGuard;

