import { useEffect } from 'react';
import { Formik, Field, type FormikHelpers, type FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, selectIsAuthenticated, VALID_CREDENTIALS } from '@/store/authSlice';
import { selectIsUserOnboardingDone } from '@/store/onboardingDataSlice';

interface LoginFormValues {
  username: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isOnboardingDone = useAppSelector(selectIsUserOnboardingDone);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && isOnboardingDone) {
      navigate('/', { replace: true });
    } else if (isAuthenticated) {
      navigate(`/onboarding`, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const validateForm = (values: LoginFormValues): Partial<Record<keyof LoginFormValues, string>> => {
    const errors: Partial<Record<keyof LoginFormValues, string>> = {};

    if (!values.username.trim()) {
      errors.username = 'Username is required';
    }

    if (!values.password.trim()) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<LoginFormValues>
  ) => {
    // Validate credentials
    if (values.username === VALID_CREDENTIALS.username && values.password === VALID_CREDENTIALS.password) {
      dispatch(login({ username: values.username }));
      // Login successful - redirect will happen via useEffect when isAuthenticated changes
      navigate(`/onboarding}`, { replace: true });
      setSubmitting(false);
    } else {
      setFieldError('password', 'Invalid credentials. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Login</h1>
          <p className="text-muted-foreground">Enter your credentials to continue</p>
        </div>

        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, submitCount, submitForm }: FormikProps<LoginFormValues>) => {
            const hasError = errors.password && (touched.password || submitCount > 0);
            const showUsernameError = (touched.username && errors.username) || (submitCount > 0 && errors.username);
            const showPasswordError = (touched.password && errors.password) || (submitCount > 0 && errors.password);

            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitForm();
                }}
                className="space-y-4"
              >
                {hasError && typeof errors.password === 'string' && errors.password.includes('Invalid') && (
                  <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                    {errors.password}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      showUsernameError ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Enter username"
                    disabled={isSubmitting}
                  />
                  {showUsernameError && (
                    <p className="text-sm text-destructive">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={`w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      showPasswordError && typeof errors.password === 'string' && !errors.password.includes('Invalid') ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Enter password"
                    disabled={isSubmitting}
                  />
                  {showPasswordError && typeof errors.password === 'string' && !errors.password.includes('Invalid') && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:shadow-md active:scale-[0.98] border-4 border-white"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
