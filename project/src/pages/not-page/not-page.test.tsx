import NotPage from './not-page';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Component: NotPage.', () => {
	it('Should render currently.', () => {
		render(<NotPage />);

		expect(screen.getByText(/Перейти к главной странице/i)).toBeInTheDocument();
	})
})