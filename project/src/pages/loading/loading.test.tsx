import Loading from './loading';

import {render, screen} from '@testing-library/react';

describe('Component: Loading.', () => {
	it('Should render currently.', () => {
		render(<Loading />);

		expect(screen.getByText(/Loading/i)).toBeInTheDocument();
	})
})