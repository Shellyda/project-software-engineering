import { render, screen } from '@/tests/test-utils';

import { IconButton } from '.';

describe('IconButton', () => {
  it('should render the heading', () => {
    render(<IconButton />);

    // Assert
    screen.getByRole('heading', { name: /IconButton/i });
  });
});
