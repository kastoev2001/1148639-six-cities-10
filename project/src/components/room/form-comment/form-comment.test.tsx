import FormComent from './form-comment';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import { BrowserRouter } from 'react-router-dom';

const mockOffers = getFakeOffers();
const mockOffer = mockOffers[3];

const mockStore = configureMockStore();

describe('Component: FormComent', () => {
  it('Should render currently', () => {
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
          <FormComent offerId={offerId} />
        </BrowserRouter>
      </Provider>
    );

    const ratings: HTMLInputElement[] = screen.getAllByTestId(/input/i);
    const textareaElement: HTMLTextAreaElement = screen.getByDisplayValue('');
    const buttonElement: HTMLButtonElement = screen.getByText(/Submit/);

    expect(textareaElement).toBeInTheDocument();
    expect(ratings).toHaveLength(5);
    expect(buttonElement.disabled).toBe(true);
  });
});
