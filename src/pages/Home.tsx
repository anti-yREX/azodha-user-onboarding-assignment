function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Welcome!</h1>
          <p className="text-muted-foreground">
            You have successfully completed your onboarding.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

