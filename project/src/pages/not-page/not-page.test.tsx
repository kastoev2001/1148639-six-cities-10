import NotPage from './not-page';

import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: NotPage.', () => {
  it('Should render currently.', () => {
    render(
      <BrowserRouter>
        <NotPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Перейти к главной странице/i)).toBeInTheDocument();
  });

  it('Should redirect by page "Main" when user click by link.', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<p>Page is Main</p>} />
        </Routes>
        <NotPage />
      </BrowserRouter>
    );

    const linkElement = screen.getByText(/Перейти к главной странице/i);

    expect(linkElement).toBeInTheDocument();

    await userEvent.click(linkElement);

    expect(screen.getByText(/Page is Main/i)).toBeInTheDocument();
  });
});
