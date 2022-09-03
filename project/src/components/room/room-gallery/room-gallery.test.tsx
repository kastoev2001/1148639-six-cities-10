import RoomGallery from './room-gallery';

import { render, screen } from '@testing-library/react';
import { getFakeOffers } from '../../../utils/mocks';
import { MAX_GALLERY_IMAGES } from '../../../const';

const mockOffers = getFakeOffers();
const mockOffer = mockOffers[8];

describe('Component: RoomGallery', () => {
	it('Should render currently', () => {

		render(<RoomGallery images={mockOffer.images}/>);

		expect(screen.getAllByAltText(/Room/i)).toHaveLength(MAX_GALLERY_IMAGES);
	})
})