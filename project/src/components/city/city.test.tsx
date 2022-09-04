import City from './city';

import userEvent from '@testing-library/user-event';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AppRoute } from '../../const';

describe('Component: City.', () => {
  it('Should render currently.', () => {
    render(
      <BrowserRouter>
        <City />
      </BrowserRouter>
    );
    const linkCityElement = screen.getByTestId(/link-city/i);

    expect(linkCityElement).toBeInTheDocument();
  });

  it('Should redirect by page "Main" when user click by link city.', async () => {
    const pathnameRoot = `${AppRoute.Root}/:id`;
    render(
      <BrowserRouter>
        <Routes>
          <Route path={pathnameRoot} element={<p>Page is Main</p>} />
        </Routes>
        <City />
      </BrowserRouter>
    );

    const linkCityElement = screen.getByTestId(/link-city/i);

    expect(linkCityElement).toBeInTheDocument();

    await userEvent.click(linkCityElement);

    expect(screen.getByText(/Page is Main/i)).toBeInTheDocument();
  });
});
