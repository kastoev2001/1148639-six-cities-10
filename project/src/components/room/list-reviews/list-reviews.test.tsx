import ListReviews from './list-reviews';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { getFakeComments } from '../../../utils/mocks';

const mockComments = getFakeComments()

describe('Component: ListReviews', () => {
	it('Should render currently', () => {
		const [firstComment, secondComment, thirdComment] = mockComments;
		
		render(<ListReviews comments={mockComments}/>);

		expect(screen.getByText(new RegExp(`${firstComment.comment}`, 'i'))).toBeInTheDocument();
		expect(screen.getByText(new RegExp(`${secondComment.comment}`, 'i'))).toBeInTheDocument();
		expect(screen.getByText(new RegExp(`${thirdComment.comment}`, 'i'))).toBeInTheDocument();
	})
})