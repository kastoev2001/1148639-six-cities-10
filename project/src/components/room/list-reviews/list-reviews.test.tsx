import ListReviews from './list-reviews';

import { render, screen } from '@testing-library/react';
import { getFakeComments } from '../../../utils/mocks';

const mockComments = getFakeComments();

describe('Component: ListReviews', () => {
  it('Should render currently', () => {
    const [firstComment, secondComment, thirdComment] = mockComments;

    render(<ListReviews comments={mockComments} />);

    const firstCommentElement = screen.getByText(new RegExp(`${firstComment.comment}`, 'i'));
    const secondCommentElement = screen.getByText(new RegExp(`${secondComment.comment}`, 'i'));
    const thirdCommentElement = screen.getByText(new RegExp(`${thirdComment.comment}`, 'i'));

    expect(firstCommentElement).toBeInTheDocument();
    expect(secondCommentElement).toBeInTheDocument();
    expect(thirdCommentElement).toBeInTheDocument();
  });
});
