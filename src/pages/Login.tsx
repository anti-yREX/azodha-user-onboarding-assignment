function Login() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Login</h1>
          <p className="text-muted-foreground">Enter your credentials to continue</p>
        </div>
        
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              placeholder="Enter username"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              placeholder="Enter password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
        </form>
        
        <p className="text-xs text-muted-foreground text-center">
          TODO: Add login logic and form handling
        </p>
      </div>
    </div>
  );
}

export default Login;

