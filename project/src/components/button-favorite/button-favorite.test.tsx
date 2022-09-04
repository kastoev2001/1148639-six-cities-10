import ButtonFavorite from './button-favorite';

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizationStatus, ButtonFavoriteConfig } from '../../const';

const mockStore = configureMockStore();

describe('Component: ButtonFavorite.', () => {
  it('Should render correctly if needed for the card', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });
    const buttonCardClass = `${ButtonFavoriteConfig.Card.className}-button`;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ButtonFavorite
            id={1}
            isFavorite={false}
            buttonFavorite={ButtonFavoriteConfig.Card}
          />
        </BrowserRouter>
      </Provider>
    );

    const buttonElement = screen.getByRole('button');
    const isButtonCard = buttonElement.classList.contains(buttonCardClass);

    expect(isButtonCard).toBe(true);
  });

  it('Should render correctly if needed for the propety.', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });
    const buttonPropetyClass = `${ButtonFavoriteConfig.Propety.className}-button`;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ButtonFavorite
            id={1}
            isFavorite={false}
            buttonFavorite={ButtonFavoriteConfig.Propety}
          />
        </BrowserRouter>
      </Provider>
    );

    const buttonElement = screen.getByRole('button');
    const isButtonPropety = buttonElement.classList.contains(buttonPropetyClass);

    expect(isButtonPropety).toBe(true);
  });
});
