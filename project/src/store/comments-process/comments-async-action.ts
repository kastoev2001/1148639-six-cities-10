import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comments } from '../../types/comments';
import { AppDispatch } from '../../types/state';
import { State } from '../../types/state';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { notifyUserOfAnError } from '../../utils/user';

export const fetchCommentsAction = createAsyncThunk<
  Comments | AxiosError,
  string, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }>(
    'data/fetchComments',
    async (
      offerId,
      { extra: api, rejectWithValue }) => {
      const requestComments = `${APIRoute.Comments}/${offerId}`;

      try {
        const { data } = await api.get<Comments>(requestComments);

        return data;
      } catch (error) {
        notifyUserOfAnError(error as AxiosError);
        return rejectWithValue(error);
      }
    }
  );
