import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comments } from '../../types/comments';
import { AppDispatch } from '../../types/state';
import { State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';

export const fetchCommentsAction = createAsyncThunk<Comments, string, {
	dispatch: AppDispatch,
	state: State,
	extra: AxiosInstance,
}>(
	'data/fetchComments',
	async (
		offerId,
		{ extra: api }) => {

		const requestComments = `${APIRoute.Comments}/${offerId}`;
		const { data } = await api.get<Comments>(requestComments);

		return data;

	}
);
