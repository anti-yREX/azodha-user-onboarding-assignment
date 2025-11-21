import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const AUTH_STORAGE_KEY = 'authState';

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

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: loadAuthState() || {
      isAuthenticated: false,
      username: null,
    },
  },
});

// Save state to localStorage whenever auth state changes
store.subscribe(() => {
  try {
    const state = store.getState();
    const authState: AuthState = {
      isAuthenticated: state.auth.isAuthenticated,
      username: state.auth.username,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  } catch (err) {
    // Ignore write errors
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

