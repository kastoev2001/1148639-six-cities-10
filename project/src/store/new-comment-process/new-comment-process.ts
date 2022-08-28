import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { postNewCommentAction } from './new-comment-async-aciton';

type InitialState = {
  newCommentStatus: {
    isLoaded: boolean,
    isRejected: boolean,
    isSuccessed: boolean
  }
};

const initialState: InitialState = {
  newCommentStatus: {
    isLoaded: false,
    isRejected: false,
    isSuccessed: false,
  },
};

export const newCommentProcess = createSlice({
  name: NameSpace.NewComment,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postNewCommentAction.pending, (state) => {
        state.newCommentStatus.isLoaded = true;
        state.newCommentStatus.isRejected = false;
        state.newCommentStatus.isSuccessed = false;
      })
      .addCase(postNewCommentAction.fulfilled, (state) => {

        state.newCommentStatus.isSuccessed = true;
        state.newCommentStatus.isLoaded = false;
      })
      .addCase(postNewCommentAction.rejected, (state) => {
        state.newCommentStatus.isRejected = true;
      });
  },
});
