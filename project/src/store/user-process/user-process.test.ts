import { userProcess } from './user-process';
import { AuthorizationStatus } from '../../const';
import { getFakeUserEmail } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from './user-async-action';

const mockUserEmail = getFakeUserEmail();

describe('Reducer: userPrcess.', () => {
	it('Should update propety authorizationStatus when loaded check auth.', () => {
		const state = { authorizationStatus: AuthorizationStatus.Unknown, userEmail: null };

		expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: mockUserEmail})).
		toEqual({authorizationStatus: AuthorizationStatus.Auth, userEmail: mockUserEmail})
	});

	it('Should update propety authorizationStatus and userEmail when rejected check auth.', () => {
		const state = { authorizationStatus: AuthorizationStatus.Unknown, userEmail: null };

		expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type})).
		toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userEmail: null})
	});

	it('Should update propety userEmail when loaded login auth.', () => {
		const state = { authorizationStatus: AuthorizationStatus.Unknown, userEmail: null };

		expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: mockUserEmail})).
		toEqual({authorizationStatus: AuthorizationStatus.Auth, userEmail: mockUserEmail})
	});

	it('Should update propety userEmail when loaded logout auth.', () => {
		const state = { authorizationStatus: AuthorizationStatus.Unknown, userEmail: null };

		expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type})).
		toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userEmail: null})
	});
});