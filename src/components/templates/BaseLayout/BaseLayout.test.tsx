import { render, screen } from '@testing-library/react';

import { BaseLayout } from './BaseLayout';

jest.mock('@/components/molecules/Menu', () => ({
  Menu: () => <div data-testid="mock-menu">Menu</div>
}));

describe('BaseLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <BaseLayout>
        <div data-testid="child-content">Child Content</div>
      </BaseLayout>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders the Menu component', () => {
    render(
      <BaseLayout>
        <div>Test Child</div>
      </BaseLayout>
    );

    expect(screen.getByTestId('mock-menu')).toBeInTheDocument();
  });

  it('applies className correctly', () => {
    render(
      <BaseLayout className="px-4 py-4 pb-20 bg-base flex-1 min-h-screen w-full max-w-full overflow-x-hidden">
        <div>Test Child</div>
      </BaseLayout>
    );

    expect(screen.getByRole('main')).toHaveClass(
      'px-4 py-4 pb-20 bg-base flex-1 min-h-screen w-full max-w-full overflow-x-hidden'
    );
  });

  it('renders with default styles', () => {
    render(
      <BaseLayout>
        <div>Test Child</div>
      </BaseLayout>
    );

    expect(screen.getByRole('main')).toHaveClass(
      'px-4 py-4 pb-20 bg-base flex-1 min-h-screen w-full max-w-full overflow-x-hidden'
    );
  });
});
