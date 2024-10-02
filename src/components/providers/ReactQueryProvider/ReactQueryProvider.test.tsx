import { render, screen } from '@testing-library/react';

import { ReactQueryProvider } from './ReactQueryProvider';

describe('ReactQueryProvider', () => {
  it('renders children correctly', () => {
    const TestComponent = () => <div>Test Component</div>;

    render(
      <ReactQueryProvider>
        <TestComponent />
      </ReactQueryProvider>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
