import { render, screen } from '@/tests/test-utils';
import React from 'react';

import { SecondLayout } from '.';

describe('SecondLayout', () => {
  it('should render the children components', () => {
    render(
      <SecondLayout>
        <h1>SecondLayout children</h1>
      </SecondLayout>
    );

    // Assert
    screen.getByRole('heading', { name: /SecondLayout children/i });
  });
});
