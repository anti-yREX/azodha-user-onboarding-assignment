/**
 * Route configuration for onboarding steps
 * TODO: Integrate with Redux to get completed steps and current step dynamically
 */

export const ONBOARDING_STEPS = [
  { path: 'profile', label: 'Profile' },
  { path: 'favorite-songs', label: 'Favorite Songs' },
  { path: 'payment-info', label: 'Payment' },
  { path: 'success', label: 'Success' },
] as const;

export type OnboardingStepPath = (typeof ONBOARDING_STEPS)[number]['path'];

/**
 * Get the index of a step by its path
 */
export function getStepIndex(path: string): number {
  return ONBOARDING_STEPS.findIndex((step) => step.path === path);
}

/**
 * Get step metadata by path
 */
export function getStepByPath(path: string): (typeof ONBOARDING_STEPS)[number] | undefined {
  return ONBOARDING_STEPS.find((step) => step.path === path);
}

/**
 * Get the first step path
 */
export function getFirstStepPath(): string {
  return ONBOARDING_STEPS[0]?.path ?? 'profile';
}

/**
 * Get all step paths
 */
export function getAllStepPaths(): string[] {
  return ONBOARDING_STEPS.map((step) => step.path);
}

