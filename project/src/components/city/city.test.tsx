import City from './city';

import userEvent from '@testing-library/user-event';

import { Routes, Route } from 'react-router-dom';
import { render, screen } from '../../utils//test-router';
import { AppRoute } from '../../const';

describe('Component: City.', () => {
  it('Should render currently.', () => {
    render(
      <City />
    );
    const linkCityElement = screen.getByTestId(/link-city/i);

    expect(linkCityElement).toBeInTheDocument();
  });

  it('Should redirect by page "Main" when user click by link city.', async () => {
    render(
      <Routes>
        <Route path={AppRoute.Root}>
				<Route path=":city" element={<p>Page is Main</p>} />
        <Route path={AppRoute.Login} element={<City />} />
				</Route>
      </Routes>,
      [AppRoute.Login]
    );

    const linkCityElement = screen.getByTestId(/link-city/i);

    expect(linkCityElement).toBeInTheDocument();

    await userEvent.click(linkCityElement);

    expect(screen.getByText(/Page is Main/i)).toBeInTheDocument();
  });
});
