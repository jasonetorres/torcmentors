import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { useAuth } from '@/hooks/useAuth';
import { OnboardingStep } from '@/types';

export default function Onboarding() {
  const { user, updateUser } = useAuth();

  if (!user) {
    return null;
  }

  const handleStepComplete = (step: OnboardingStep) => {
    updateUser({ onboardingStep: step });
  };

  const handleComplete = () => {
    updateUser({ 
      onboardingStep: 'completed',
      isOnboardingComplete: true 
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <OnboardingFlow
        userRole={user.role}
        currentStep={user.onboardingStep}
        onStepComplete={handleStepComplete}
        onComplete={handleComplete}
      />
    </div>
  );
}