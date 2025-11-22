import { Formik, Field, type FormikHelpers, type FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateProfile, setProfileDone, selectProfile } from '@/store/onboardingDataSlice';

interface ProfileFormValues {
  name: string;
  age: string;
  email: string;
  profilePic: string | null;
}

function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues: ProfileFormValues = {
    name: profile.name,
    age: profile.age?.toString() || '',
    email: profile.email,
    profilePic: profile.profilePic,
  };

  const validateForm = (values: ProfileFormValues): Partial<Record<keyof ProfileFormValues, string>> => {
    const errors: Partial<Record<keyof ProfileFormValues, string>> = {};

    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!values.age) {
      errors.age = 'Age is required';
    } else {
      const ageNum = parseInt(values.age, 10);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
        errors.age = 'Age must be between 1 and 150';
      }
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    return errors;
  };

  const handleSubmit = (
    values: ProfileFormValues,
    { setSubmitting }: FormikHelpers<ProfileFormValues>
  ) => {
    const ageNum = values.age ? parseInt(values.age, 10) : null;
    dispatch(updateProfile({ name: values.name, age: ageNum, email: values.email, profilePic: values.profilePic }));
    dispatch(setProfileDone(true));
    setSubmitting(false);
    navigate('/onboarding/favorite-songs');
  };

  const handleProfilePicChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFieldValue('profilePic', result);
        dispatch(updateProfile({ profilePic: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Personal Profile</h2>
        <p className="text-muted-foreground">Step 1: Enter your personal information</p>
      </div>

      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting, setFieldValue, handleBlur, submitForm }: FormikProps<ProfileFormValues>) => {
          const isFormValid = values.name.trim() && values.age && values.email.trim();

          return (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formErrors = validateForm(values);
              if (Object.keys(formErrors).length === 0) {
                submitForm();
              }
            }} className="space-y-6">
              <div className="p-6 border border-border rounded-lg bg-card space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="Enter your name"
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      // Auto-save to Redux
                      dispatch(updateProfile({ name: e.target.value }));
                    }}
                  />
                  {touched.name && errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Age Field */}
                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm font-medium">
                    Age <span className="text-destructive">*</span>
                  </label>
                  <Field
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    max="150"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="Enter your age"
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      // Auto-save to Redux
                      const ageNum = e.target.value ? parseInt(e.target.value, 10) : null;
                      dispatch(updateProfile({ age: ageNum }));
                    }}
                  />
                  {touched.age && errors.age && (
                    <p className="text-sm text-destructive">{errors.age}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="Enter your email"
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      // Auto-save to Redux
                      dispatch(updateProfile({ email: e.target.value }));
                    }}
                  />
                  {touched.email && errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Profile Picture Field */}
                <div className="space-y-2">
                  <label htmlFor="profilePic" className="block text-sm font-medium">
                    Profile Picture
                  </label>
                  <input
                    ref={fileInputRef}
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleProfilePicChange(e, setFieldValue)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors border-4"
                    >
                      {values.profilePic ? 'Change Picture' : 'Upload Picture'}
                    </button>
                    {values.profilePic && (
                      <div className="relative">
                        <img
                          src={values.profilePic}
                          alt="Profile preview"
                          className="w-20 h-20 object-cover rounded-md border border-border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFieldValue('profilePic', null);
                            dispatch(updateProfile({ profilePic: null }));
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="absolute -top-4 -right-4 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 border border-white text-[16px] pb-[3px]"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Max file size: 5MB. Supported formats: JPG, PNG, GIF
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:shadow-md active:scale-[0.98] border-4 border-white"
                >
                  Next
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Profile;
