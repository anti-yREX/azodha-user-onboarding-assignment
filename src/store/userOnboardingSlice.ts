import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserOnboardingState {
  isDone: boolean;
}

const initialState: UserOnboardingState = {
  isDone: false,
};

const userOnboardingSlice = createSlice({
  name: 'userOnboarding',
  initialState,
  reducers: {
    setOnboardingDone: (state, action: PayloadAction<boolean>) => {
      state.isDone = action.payload;
    },
  },
});

export const { setOnboardingDone } = userOnboardingSlice.actions;
export default userOnboardingSlice.reducer;

// Selectors
export const selectIsUserOnboardingDone = (state: { userOnboarding: UserOnboardingState }) =>
  state.userOnboarding.isDone;

