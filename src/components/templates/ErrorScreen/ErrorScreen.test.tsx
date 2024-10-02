import { render, screen } from '@testing-library/react';

import ErrorScreen from './ErrorScreen';

jest.mock('@/styles/customIcons', () => ({
  ErrorIcon: () => <div data-testid="error-icon" />
}));

jest.mock('@heroicons/react/24/outline', () => ({
  ArrowPathIcon: () => <div data-testid="reload-icon" />
}));

describe('ErrorScreen Component', () => {
  it('renders the error icon correctly', () => {
    render(<ErrorScreen />);
    const errorIcon = screen.getByTestId('error-icon');
    expect(errorIcon).toBeInTheDocument();
  });

  it('renders the Ops! text correctly', () => {
    render(<ErrorScreen />);
    const opsText = screen.getByText('Ops!');
    expect(opsText).toBeInTheDocument();
  });

  it('renders the error message correctly', () => {
    render(<ErrorScreen />);
    const errorMessage = screen.getByText(
      /Parece que algo deu errado no seu caminho para a cozinha.../i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
