import SignIn from './sign-in';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { } from '@jedmao/redux-mock-store';

describe('Component: SignIn.', () => {
  it('Should render correctly', () => {

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
