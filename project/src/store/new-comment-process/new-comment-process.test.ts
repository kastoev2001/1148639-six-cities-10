import { postNewCommentAction } from './new-comment-async-aciton';
import { newCommentProcess } from './new-comment-process';

describe('Reducer: newCommentProcess.', () => {
	it('Should update propety newCommentStatus when loading. new comment.', () => {
		const state = {
			newCommentStatus: {
				isLoaded: false,
				isRejected: false,
				isSuccessed: false,
			},
		};

		expect(newCommentProcess.reducer(state, { type: postNewCommentAction.pending.type }))
			.toEqual({
				newCommentStatus: {
					isLoaded: true,
					isRejected: false,
					isSuccessed: false,
				},
			});
	});

	it('Should update propety newCommentStatus when loaded new Comment.', () => {
		const state = {
			newCommentStatus: {
				isLoaded: false,
				isRejected: false,
				isSuccessed: false,
			},
		};
		expect(newCommentProcess.reducer(state, {type: postNewCommentAction.fulfilled.type}))
		.toEqual({
			newCommentStatus: {
				isLoaded: false,
				isRejected: false,
				isSuccessed: true,
			},
		})
	});

	it('Should update propety newCommentStatus when rejected new Comment.', () => {
		const state = {
			newCommentStatus: {
				isLoaded: false,
				isRejected: false,
				isSuccessed: false,
			},
		};
		expect(newCommentProcess.reducer(state, {type: postNewCommentAction.rejected.type}))
		.toEqual({
			newCommentStatus: {
				isLoaded: false,
				isRejected: true,
				isSuccessed: false,
			},
		});
	});
});
