import Rating from './rating';

import { render, screen } from '@testing-library/react';
import { getFakeOffers } from '../../utils/mocks';

const mockOffers = getFakeOffers();
const mockOffer = mockOffers[0];



describe('Component: Rating', () => {
	it('Should render currently', () => {
		const { rating } = mockOffer

		render(<Rating rating={rating} />);

		const ratingElement = screen.getByTestId('rating');

		expect(ratingElement).toBeInTheDocument();
	})
})