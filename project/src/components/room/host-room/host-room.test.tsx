import HostRoom from './host-room';

import { render, screen } from '@testing-library/react';
import { getFakeOffers } from '../../../utils/mocks';

const mockOffers = getFakeOffers();
const mockOffer = mockOffers[8];


describe('Component: HostRoom', () => {
  it('Should render currently', () => {
    const { host, description } = mockOffer;

    render(<HostRoom host={host} description={description} />);

    expect(screen.getByText(new RegExp(`${description}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });
});
