import { commentsProcess } from './comments-process';
import { getFakeComments } from '../../utils/mocks';
import { fetchCommentsAction } from './comments-async-action';
import { postNewCommentAction } from '../new-comment-process/new-comment-async-action';

const mockComments = getFakeComments();

describe('Reducer: commentsProcess.', () => {
	it('Without additional parameters should return inital state.', () => {
		expect(commentsProcess.reducer(undefined, {type: 'UNKNOW_ACTION'}))
		.toEqual({comments: [], isCommentsLoaded: false});
	});

	it('Should update propety comments when loaded comments', () => {
		const state = {comments: [], isCommentsLoaded: false};

		expect(commentsProcess.reducer(state, {type: fetchCommentsAction.fulfilled.type, payload: mockComments}))
		.toEqual({comments: mockComments, isCommentsLoaded: false});
	});

	it('Should update propety isCommentsLoaded when loading comments.', () => {		
		const state = {comments: [], isCommentsLoaded: false};

		expect(commentsProcess.reducer(state, {type: fetchCommentsAction.pending.type}))
		.toEqual({comments: [], isCommentsLoaded: true});
	});

	it('Should reset propety comments and isCommentsLoaded when rejectd comments.', () => {
		const state = {comments: [], isCommentsLoaded: false};

		expect(commentsProcess.reducer(state, {type: fetchCommentsAction.rejected.type}))
		.toEqual({comments: [], isCommentsLoaded: false});
	});

	it('Should update propety comments when created new comment.', () => {
		const state = {comments: mockComments, isCommentsLoaded: false};

		expect(commentsProcess.reducer(state, {type: postNewCommentAction.fulfilled.type, payload: mockComments}))
		.toEqual({comments: mockComments, isCommentsLoaded: false});
	});
});
