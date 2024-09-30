import { render, screen } from '@/tests/test-utils';

import { Menu } from '.';

describe('Menu', () => {
  it('should render the heading', () => {
    render(<Menu />);

    // Assert
    screen.getByRole('heading', { name: /Menu/i });
  });
});
