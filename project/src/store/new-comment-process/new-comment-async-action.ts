import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Comments } from '../../types/comments';
import { NewComment } from '../../types/new-comment-data';
import { AppDispatch, State } from '../../types/state';
import { notifyUserOfAnError } from '../../utils/user/user';

export const postNewCommentAction = createAsyncThunk<
  Comments | AxiosError,
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
  async ({ id, newComment }, { extra: api, rejectWithValue }) => {
    const requestNewComment = `${APIRoute.Comments}/${id}`;

    try {
      const { data } = await api.post<Comments>(requestNewComment, newComment);

      return data;
    } catch (error) {
      notifyUserOfAnError(error as AxiosError);
      return rejectWithValue(error);
    }
  }
);
