import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setOnboardingDone,
  selectProfileIsDone,
  selectFavoriteSongsIsDone,
  selectPaymentInfoIsDone,
} from '@/store/onboardingDataSlice';

function Success() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profileIsDone = useAppSelector(selectProfileIsDone);
  const favoriteSongsIsDone = useAppSelector(selectFavoriteSongsIsDone);
  const paymentInfoIsDone = useAppSelector(selectPaymentInfoIsDone);

  const handleGetStarted = () => {
    // Only set onboarding as done if all three steps are completed
    if (profileIsDone && favoriteSongsIsDone && paymentInfoIsDone) {
      dispatch(setOnboardingDone(true));
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="space-y-8 text-center max-w-md w-full">
        {/* Green Circle with Checkmark */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">All Set!</h2>
          <p className="text-muted-foreground">
            You're ready to get started
          </p>
        </div>

        {/* Get Started Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 transform hover:shadow-md active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
