function FavoriteSongs() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Favorite Songs</h2>
        <p className="text-muted-foreground">
          Step 2: Add your favorite songs
        </p>
      </div>
      
      <div className="p-6 border border-border rounded-lg bg-card">
        <p className="text-sm text-muted-foreground">
          TODO: Add Formik-based dynamic list for favorite songs (add/remove entries)
        </p>
      </div>
    </div>
  );
}

export default FavoriteSongs;

