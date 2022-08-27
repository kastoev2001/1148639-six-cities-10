import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserEmail } from '../../types/state';
import { NameSpace } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from './user-async-action';

type InitialState = {
  authorizationStatus: AuthorizationStatus,
  userEmail: UserEmail,
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    changeUserEmail: (state, action) => {
      const userEmail: UserEmail = action.payload;
      state.userEmail = userEmail;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        const userEmail = action.payload;

        state.userEmail = userEmail;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const userEmail = action.payload;

        state.userEmail = userEmail;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { changeUserEmail } = userProcess.actions;
