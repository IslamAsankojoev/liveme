import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils/getLocalStorage';

import { logout, getMe, updateMe } from './user.actions';

type IInitialState = {
  user: IUser | null;
  isLoading: boolean;
};

const initialState: IInitialState = {
  user: getLocalStorage('user'),
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMe.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateMe.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateMe.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;
