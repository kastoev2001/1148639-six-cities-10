import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Comments } from '../../types/comments';
import { fetchCommentsAction } from './comments-async-action';

type CommentsState = {
  comments: Comments,
  isCommentsLoaded: boolean,
};

const initialState: CommentsState = {
  comments: [],
  isCommentsLoaded: false,
};

export const commentsProcess = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsLoaded = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        const comments = action.payload;
        state.comments = comments;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.comments = [];
        state.isCommentsLoaded = false;
      });
  },
});
