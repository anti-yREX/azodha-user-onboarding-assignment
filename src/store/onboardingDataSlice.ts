import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteSong {
  id: string;
  songName: string;
  artist: string;
}

interface FavoriteSongsData {
  songs: FavoriteSong[];
  isDone: boolean;
}

interface ProfileData {
  name: string;
  age: number | null;
  email: string;
  profilePic: string | null;
  isDone: boolean;
}

interface PaymentInfoData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  isDone: boolean;
}

interface OnboardingDataState {
  isDone: boolean;
  profile: ProfileData;
  favoriteSongs: FavoriteSongsData;
  paymentInfo: PaymentInfoData;
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
    updateFavoriteSongs: (state, action: PayloadAction<FavoriteSong[]>) => {
      state.favoriteSongs.songs = action.payload;
    },
    setFavoriteSongsDone: (state, action: PayloadAction<boolean>) => {
      state.favoriteSongs.isDone = action.payload;
    },
    updatePaymentInfo: (state, action: PayloadAction<Partial<PaymentInfoData>>) => {
      state.paymentInfo = { ...state.paymentInfo, ...action.payload };
    },
    setPaymentInfoDone: (state, action: PayloadAction<boolean>) => {
      state.paymentInfo.isDone = action.payload;
    },
  },
});

export const {
  setOnboardingDone,
  updateProfile,
  setProfileDone,
  updateFavoriteSongs,
  setFavoriteSongsDone,
  updatePaymentInfo,
  setPaymentInfoDone,
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
  state.onboardingData.favoriteSongs.songs;
export const selectFavoriteSongsIsDone = (state: { onboardingData: OnboardingDataState }) =>
  state.onboardingData.favoriteSongs.isDone;
export const selectPaymentInfo = (state: { onboardingData: OnboardingDataState }) =>
  state.onboardingData.paymentInfo;
export const selectPaymentInfoIsDone = (state: { onboardingData: OnboardingDataState }) =>
  state.onboardingData.paymentInfo.isDone;

/**
 * Get the path of the first incomplete onboarding step
 * Checks steps in order: profile → favorite-songs → payment-info → success
 */
export const selectFirstIncompleteStepPath = (state: { onboardingData: OnboardingDataState }): string => {
  const { profile, favoriteSongs, paymentInfo } = state.onboardingData;
  
  if (!profile.isDone) {
    return 'profile';
  }
  if (!favoriteSongs.isDone) {
    return 'favorite-songs';
  }
  if (!paymentInfo.isDone) {
    return 'payment-info';
  }
  // If all steps are done, return success (or could return profile as fallback)
  return 'success';
};

