import Reivew from './review';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeComments } from '../../../utils/mocks';
import { AuthorizationStatus } from '../../../const';
import { BrowserRouter } from 'react-router-dom';

const mockComments = getFakeComments();
const mockComment = mockComments[1];

const mockStore = configureMockStore();

describe('Component: Reivew', () => {
	it('Should render currently', () => {
		render(<Reivew comment={mockComment} />);

		expect(screen.getByText(new RegExp(`${mockComment.comment}`, 'i'))).toBeInTheDocument();
		expect(screen.getByText(new RegExp(/Rating/i))).toBeInTheDocument();
	})
})