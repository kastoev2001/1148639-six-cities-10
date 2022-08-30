import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, MAX_COMMENT } from '../../const';
import { Comments } from '../../types/comments';
import { fetchCommentsAction } from './comments-async-action';
import { postNewCommentAction } from '../new-comment-process/new-comment-async-aciton';
import { commentsSortHighTolow } from '../../utils/comments';

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
				const commentsSorted = action.payload.sort(commentsSortHighTolow);
        const comments = commentsSorted.slice(0, MAX_COMMENT);

        state.comments = comments;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.comments = [];
        state.isCommentsLoaded = false;
      })
      .addCase(postNewCommentAction.fulfilled, (state, action) => {
				const newCommentsSorted = action.payload.sort(commentsSortHighTolow);
        const newComments = newCommentsSorted.slice(0, MAX_COMMENT);

        state.comments = newComments;
      });
  },
});
