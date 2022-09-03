import StatusRoom from './status-room';

import { render, screen } from '@testing-library/react';

describe('Component: StatusRoom', () => {
  it('Should render currently', () => {

    render(<StatusRoom />);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });
});
