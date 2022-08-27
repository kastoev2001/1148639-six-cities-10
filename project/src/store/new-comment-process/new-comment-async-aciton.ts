import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Comments } from '../../types/comments';
import { NewComment } from '../../types/new-comment-data';
import { AppDispatch, State } from '../../types/state';

export const postNewCommentAction = createAsyncThunk<
  Comments,
  {
    id: number,
    newComment: NewComment
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }
>(
  'newComments/postNewComment',
  async ({ id, newComment }, { extra: api }) => {
    const requestNewComment = `${APIRoute.Comments}/${id}`;

    const { data } = await api.post<Comments>(requestNewComment, newComment);

    return data;
  }
);
