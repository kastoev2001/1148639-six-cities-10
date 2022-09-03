import UserStatus from './user-status';

import { render, screen } from '@testing-library/react';

describe('Component: UserStatus.', () => {
  it('Should reudner currently.', () => {
    render(<UserStatus />);

    expect(screen.getByText(/Pro/i)).toBeInTheDocument();
  });
});
