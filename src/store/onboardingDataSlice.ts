import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProfileData {
  name: string;
  age: number | null;
  email: string;
  profilePic: string | null;
  isDone: boolean;
}

interface OnboardingDataState {
  isDone: boolean;
  profile: ProfileData;
  favoriteSongs: unknown[];
  paymentInfo: Record<string, unknown>;
}

const initialState: OnboardingDataState = {
  isDone: false,
  profile: {
    name: '',
    age: null,
    email: '',
    profilePic: null,
    isDone: false,
  },
  favoriteSongs: [],
  paymentInfo: {},
};

const onboardingDataSlice = createSlice({
  name: 'onboardingData',
  initialState,
  reducers: {
    setOnboardingDone: (state, action: PayloadAction<boolean>) => {
      state.isDone = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<ProfileData>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setProfileDone: (state, action: PayloadAction<boolean>) => {
      state.profile.isDone = action.payload;
    },
    updateFavoriteSongs: (state, action: PayloadAction<unknown[]>) => {
      state.favoriteSongs = action.payload;
    },
    updatePaymentInfo: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.paymentInfo = action.payload;
    },
  },
});

export const {
  setOnboardingDone,
  updateProfile,
  setProfileDone,
  updateFavoriteSongs,
  updatePaymentInfo,
} = onboardingDataSlice.actions;
export default onboardingDataSlice.reducer;

// Selectors
export const selectIsUserOnboardingDone = (state: { onboardingData: OnboardingDataState }) =>
  state.onboardingData.isDone;
export const selectProfile = (state: { onboardingData: OnboardingDataState }) =>
  state.onboardingData.profile;
export const selectProfileIsDone = (state: { onboardingData: OnboardingDataState }) =>
  state.onboardingData.profile.isDone;
export const selectFavoriteSongs = (state: { onboardingData: OnboardingDataState }) =>
  state.onboardingData.favoriteSongs;
export const selectPaymentInfo = (state: { onboardingData: OnboardingDataState }) =>
  state.onboardingData.paymentInfo;

