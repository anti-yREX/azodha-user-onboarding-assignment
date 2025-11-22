import { Formik, Field, FieldArray, type FormikHelpers, type FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  updateFavoriteSongs,
  setFavoriteSongsDone,
  selectFavoriteSongs,
  type FavoriteSong,
} from '@/store/onboardingDataSlice';

interface FavoriteSongsFormValues {
  songs: FavoriteSong[];
}

function FavoriteSongs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoriteSongs = useAppSelector(selectFavoriteSongs);

  const initialValues: FavoriteSongsFormValues = {
    songs: favoriteSongs.length > 0 ? favoriteSongs : [{ id: Date.now().toString(), songName: '', artist: '' }],
  };

  const validateForm = (values: FavoriteSongsFormValues): Partial<Record<string, string>> => {
    const errors: Partial<Record<string, string>> = {};

    if (values.songs.length === 0) {
      errors.songs = 'At least one song is required';
      return errors;
    }

    values.songs.forEach((song, index) => {
      if (!song.songName.trim()) {
        errors[`songs.${index}.songName`] = 'Song name is required';
      }
      if (!song.artist.trim()) {
        errors[`songs.${index}.artist`] = 'Artist is required';
      }
    });

    return errors;
  };

  const handleSubmit = (
    values: FavoriteSongsFormValues,
    { setSubmitting }: FormikHelpers<FavoriteSongsFormValues>
  ) => {
    // Filter out empty songs before saving
    const validSongs = values.songs.filter((song) => song.songName.trim() && song.artist.trim());
    
    dispatch(updateFavoriteSongs(validSongs));
    dispatch(setFavoriteSongsDone(true));
    setSubmitting(false);
    navigate('/onboarding/payment-info');
  };

  const handleBack = () => {
    navigate('/onboarding/profile');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Favorite Songs</h2>
        <p className="text-muted-foreground">Step 2: Add your favorite songs</p>
      </div>
      
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting, setFieldValue, submitForm }: FormikProps<FavoriteSongsFormValues>) => (
          <form onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }} className="space-y-6">
            <div className="p-6 border border-border rounded-lg bg-card space-y-4">
              <FieldArray name="songs">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.songs.map((song, index) => (
                      <div
                        key={song.id}
                        className="p-4 border border-border rounded-md bg-background space-y-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-4">
                            {/* Song Name Field */}
                            <div className="space-y-2">
                              <label
                                htmlFor={`songs.${index}.songName`}
                                className="block text-sm font-medium"
                              >
                                Song Name <span className="text-destructive">*</span>
                              </label>
                              <Field
                                id={`songs.${index}.songName`}
                                name={`songs.${index}.songName`}
                                type="text"
                                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                placeholder="Enter song name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setFieldValue(`songs.${index}.songName`, e.target.value);
                                  // Auto-save to Redux
                                  const updatedSongs = [...values.songs];
                                  updatedSongs[index] = { ...updatedSongs[index], songName: e.target.value };
                                  dispatch(updateFavoriteSongs(updatedSongs));
                                }}
                              />
                              {touched.songs?.[index]?.songName && errors.songs?.[index] && (
                                <p className="text-sm text-destructive">
                                  {typeof errors.songs[index] === 'object' && errors.songs[index] !== null && 'songName' in errors.songs[index]
                                    ? (errors.songs[index] as { songName?: string }).songName
                                    : typeof errors.songs[index] === 'string'
                                    ? errors.songs[index]
                                    : ''}
                                </p>
                              )}
                            </div>

                            {/* Artist Field */}
                            <div className="space-y-2">
                              <label
                                htmlFor={`songs.${index}.artist`}
                                className="block text-sm font-medium"
                              >
                                Artist <span className="text-destructive">*</span>
                              </label>
                              <Field
                                id={`songs.${index}.artist`}
                                name={`songs.${index}.artist`}
                                type="text"
                                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                placeholder="Enter artist name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setFieldValue(`songs.${index}.artist`, e.target.value);
                                  // Auto-save to Redux
                                  const updatedSongs = [...values.songs];
                                  updatedSongs[index] = { ...updatedSongs[index], artist: e.target.value };
                                  dispatch(updateFavoriteSongs(updatedSongs));
                                }}
                              />
                              {touched.songs?.[index]?.artist && errors.songs?.[index] && (
                                <p className="text-sm text-destructive">
                                  {typeof errors.songs[index] === 'object' && errors.songs[index] !== null && 'artist' in errors.songs[index]
                                    ? (errors.songs[index] as { artist?: string }).artist
                                    : typeof errors.songs[index] === 'string'
                                    ? errors.songs[index]
                                    : ''}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Remove Button */}
                          {values.songs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                remove(index);
                                const updatedSongs = values.songs.filter((_, i) => i !== index);
                                dispatch(updateFavoriteSongs(updatedSongs));
                              }}
                              className="px-3 py-2 bg-destructive text-destructive-foreground rounded-md font-medium hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors border-4 shadow-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add Song Button */}
                    <button
                      type="button"
                      onClick={() => {
                        push({ id: Date.now().toString(), songName: '', artist: '' });
                      }}
                      className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors border-4"
                    >
                      + Add Another Song
                    </button>

                    {errors.songs && typeof errors.songs === 'string' && (
                      <p className="text-sm text-destructive">{errors.songs}</p>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Back and Next Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium shadow-sm hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 transform hover:shadow-md active:scale-[0.98] border-4"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting || values.songs.length === 0}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:shadow-md active:scale-[0.98] border-4 border-white"
              >
                Next
              </button>
      </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FavoriteSongs;
