import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectFirstIncompleteStepPath } from '@/store/onboardingDataSlice';
import { getStepIndex } from '@/config/routes';

interface StepGuardProps {
  children: ReactNode;
  stepPath: string;
}

/**
 * Step guard component to validate step access
 * 
 * Logic:
 * - Get first incomplete step from Redux
 * - Allow access to completed steps + first incomplete step
 * - Redirect to first incomplete step if accessing future step
 */
function StepGuard({ children, stepPath }: StepGuardProps) {
  const firstIncompleteStepPath = useAppSelector(selectFirstIncompleteStepPath);
  const currentStepIndex = getStepIndex(stepPath);
  const firstIncompleteStepIndex = getStepIndex(firstIncompleteStepPath);
  
  // If accessing a step that comes after the first incomplete step, redirect
  if (currentStepIndex > firstIncompleteStepIndex) {
    return <Navigate to={`/onboarding/${firstIncompleteStepPath}`} replace />;
  }
  
  // Allow access to the first incomplete step and any completed steps
  return <>{children}</>;
}

export default StepGuard;

