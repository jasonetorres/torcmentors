import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { OnboardingStep } from '@/types';

export default function Onboarding() {
  const { user, profile, updateProfile } = useAuth();

  if (!user || !profile) {
    return null;
  }

  const handleStepComplete = (step: OnboardingStep) => {
    updateProfile({ onboarding_step: step });
  };

  const handleComplete = () => {
    updateProfile({ 
      onboarding_step: 'completed',
      is_onboarding_complete: true 
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <OnboardingFlow
        userRole={profile.role as any}
        currentStep={profile.onboarding_step as OnboardingStep}
        onStepComplete={handleStepComplete}
        onComplete={handleComplete}
      />
    </div>
  );
}