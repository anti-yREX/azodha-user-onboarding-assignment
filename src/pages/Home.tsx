import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/onboarding/profile');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Welcome!</h1>
          <p className="text-muted-foreground">
            You have successfully completed your onboarding.
          </p>
        </div>
        <div className="mt-24"/>
        <div className="flex justify-center">
          <button
            onClick={handleEditProfile}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium shadow-sm hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 transform hover:shadow-md active:scale-[0.98] border-4"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

