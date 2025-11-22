import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import onboardingDataReducer from './onboardingDataSlice';

const AUTH_STORAGE_KEY = 'authState';
const ONBOARDING_DATA_STORAGE_KEY = 'onboardingDataState';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

// Load initial state from localStorage
const loadAuthState = (): AuthState | undefined => {
  try {
    const serializedState = localStorage.getItem(AUTH_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as AuthState;
  } catch (err) {
    return undefined;
  }
};

// Load onboarding data from localStorage
const loadOnboardingData = () => {
  try {
    const serializedState = localStorage.getItem(ONBOARDING_DATA_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboardingData: onboardingDataReducer,
  },
  preloadedState: {
    auth: loadAuthState() || {
      isAuthenticated: false,
      username: null,
    },
    onboardingData: loadOnboardingData() || {
      isDone: false,
      profile: {
        name: '',
        age: null,
        email: '',
        profilePic: null,
        isDone: false,
      },
      favoriteSongs: {
        songs: [],
        isDone: false,
      },
      paymentInfo: {
        cardNumber: '',
        expiry: '',
        cvv: '',
        isDone: false,
      },
    },
  },
});

// Save state to localStorage whenever state changes
store.subscribe(() => {
  try {
    const state = store.getState();
    
    // Save auth state
    const authState: AuthState = {
      isAuthenticated: state.auth.isAuthenticated,
      username: state.auth.username,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    
    // Save onboarding data
    localStorage.setItem(ONBOARDING_DATA_STORAGE_KEY, JSON.stringify(state.onboardingData));
  } catch (err) {
    // Ignore write errors
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

