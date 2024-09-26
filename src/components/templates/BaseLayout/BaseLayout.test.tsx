import { render, screen } from '@/tests/test-utils';
import React from 'react';

import { BaseLayout } from '.';

describe('MainLayout', () => {
  it('should render the children components', () => {
    render(
      <BaseLayout>
        <h1>BaseLayout children</h1>
      </BaseLayout>
    );

    // Assert
    screen.getByRole('heading', { name: /BaseLayout children/i });
  });
});
