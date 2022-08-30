import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, MAX_COMMENT } from '../../const';
import { Comments } from '../../types/comments';
import { fetchCommentsAction } from './comments-async-action';
import { postNewCommentAction } from '../new-comment-process/new-comment-async-aciton';
import { commentsSortHighTolow } from '../../utils/comments';
import { AxiosError } from 'axios';
import { notifyUserOfAnError } from '../../utils/user';

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
        const comments = action.payload as Comments;
        const commentsSorted = comments.sort(commentsSortHighTolow);
        const commentsSliced = commentsSorted.slice(0, MAX_COMMENT);

        state.comments = commentsSliced;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        const error = action.payload as AxiosError;

        state.comments = [];
        state.isCommentsLoaded = false;

        notifyUserOfAnError(error);
      })
      .addCase(postNewCommentAction.fulfilled, (state, action) => {
        const newComments = action.payload as Comments;
        const newCommentsSorted = newComments.sort(commentsSortHighTolow);
        const newCommentsSliced = newCommentsSorted.slice(0, MAX_COMMENT);

        state.comments = newCommentsSliced;
      });
  },
});
