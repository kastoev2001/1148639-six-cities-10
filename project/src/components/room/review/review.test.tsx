import Reivew from './review';

import { render, screen } from '@testing-library/react';
import { getFakeComments } from '../../../utils/mocks';

const mockComments = getFakeComments();
const mockComment = mockComments[1];


describe('Component: Reivew', () => {
  it('Should render currently', () => {
    render(<Reivew comment={mockComment} />);

    expect(screen.getByText(new RegExp(`${mockComment.comment}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(/Rating/i))).toBeInTheDocument();
  });
});
