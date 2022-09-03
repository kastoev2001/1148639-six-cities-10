import HostDescription from './host-description';

import { render, screen } from '@testing-library/react';
import { getFakeOffers } from '../../../utils/mocks';

const mockOffers = getFakeOffers();
const mockOffer = mockOffers[3]

describe('Component: UserDescription', () => {
	it('Should render currently', () => {
		const { description } = mockOffer;

		render(<HostDescription description={description} />);

		expect(screen.getByText(new RegExp(`${description}`))).toBeInTheDocument();
	})
})