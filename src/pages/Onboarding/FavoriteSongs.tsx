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
        {({ values, errors, touched, isSubmitting, setFieldValue }: FormikProps<FavoriteSongsFormValues>) => (
          <form onSubmit={(e) => {
            e.preventDefault();
            const formErrors = validateForm(values);
            if (Object.keys(formErrors).length === 0) {
              handleSubmit(values, { setSubmitting: () => {} } as FormikHelpers<FavoriteSongsFormValues>);
            }
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
                              {touched.songs?.[index]?.songName && errors.songs?.[index]?.songName && (
                                <p className="text-sm text-destructive">
                                  {typeof errors.songs[index] === 'object' && errors.songs[index]?.songName
                                    ? errors.songs[index].songName
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
                              {touched.songs?.[index]?.artist && errors.songs?.[index]?.artist && (
                                <p className="text-sm text-destructive">
                                  {typeof errors.songs[index] === 'object' && errors.songs[index]?.artist
                                    ? errors.songs[index].artist
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
                              className="px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
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
                      className="w-full px-4 py-2 border border-dashed border-input rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
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

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || values.songs.length === 0}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:shadow-md active:scale-[0.98]"
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
