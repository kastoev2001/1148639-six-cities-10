import FormComment from './form-comment';

import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import { BrowserRouter } from 'react-router-dom';

const mockOffers = getFakeOffers();
const mockOffer = mockOffers[3];

const mockStore = configureMockStore();

describe('Component: FormComent.', () => {
  it('Should render currently.', async () => {
    const offerId = mockOffer.id;
    const store = mockStore({
      newComment: {
        newCommentStatus: {
          isloaded: false,
          isSuccessed: false,
          isRejected: false
        }
      },
      offers: { offers: mockOffers },
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <FormComment offerId={offerId} />
        </BrowserRouter>
      </Provider>
    );

    const ratings: HTMLInputElement[] = screen.getAllByTestId(/input/i);
    const textareaElement: HTMLTextAreaElement = screen.getByDisplayValue('');
    const buttonElement: HTMLButtonElement = screen.getByText(/Submit/);
    const mockDescription = 'для проверки табуляции с точки зрения конечного пользователя.';

    expect(textareaElement).toBeInTheDocument();
    expect(ratings).toHaveLength(5);
    expect(buttonElement.disabled).toBe(true);

    const rating = ratings[4];

    await userEvent.click(rating);
    await userEvent.click(textareaElement);
    await userEvent.keyboard(mockDescription);

    expect(buttonElement.disabled).toBe(false);

  });

  it('Should enter data in the fields sending new comment.', async () => {
    const offerId = mockOffer.id;
    const store = mockStore({
      newComment: {
        newCommentStatus: {
          isloaded: false,
          isSuccessed: false,
          isRejected: false
        }
      },
      offers: { offers: mockOffers },
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <FormComment offerId={offerId} />
        </BrowserRouter>
      </Provider>
    );

    const ratings: HTMLInputElement[] = screen.getAllByTestId(/input/i);
    const textareaElement: HTMLTextAreaElement = screen.getByDisplayValue('');
    const buttonElement: HTMLButtonElement = screen.getByText(/Submit/);
    const mockDescription = 'для проверки табуляции с точки зрения конечного пользователя.';
    expect(textareaElement).toBeInTheDocument();
    expect(ratings).toHaveLength(5);
    expect(buttonElement.disabled).toBe(true);

    const rating = ratings[4];

    await userEvent.click(rating);
    await userEvent.click(textareaElement);
    await userEvent.keyboard(mockDescription);

    expect(rating.checked).toBe(true);
    expect(mockDescription === textareaElement.value).toBe(true);
    expect(buttonElement.disabled).toBe(false);
  });
});
