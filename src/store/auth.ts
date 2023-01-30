import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';
import { PURGE } from 'redux-persist';

export interface authState {
  auth: any;
  error: string;
}

export const initialState = {
  auth: null,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuthInfoSuccess(state, { payload }) {
      state.auth = payload;
    },

    getauthFailure(state, { payload }: PayloadAction<authState>) {
      state.error = payload.error;
    },
    extraReducers: (builder: any) => {
      builder.addCase(PURGE, state => {
        localStorage.remove('auth');
      });
    },
  },
});

export const { getauthFailure, getAuthInfoSuccess } = authSlice.actions;

export const initAuth =
  (payload): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getAuthInfoSuccess(payload));
  };

export default authSlice.reducer;
