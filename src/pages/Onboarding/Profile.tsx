function Profile() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Personal Profile</h2>
        <p className="text-muted-foreground">
          Step 1: Enter your personal information
        </p>
      </div>
      
      <div className="p-6 border border-border rounded-lg bg-card">
        <p className="text-sm text-muted-foreground">
          TODO: Add profile form fields (name, age, email, profile picture)
        </p>
      </div>
    </div>
  );
}

export default Profile;

