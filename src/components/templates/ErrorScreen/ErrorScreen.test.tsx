import { fireEvent, render, screen } from '@testing-library/react';

import ErrorScreen from './ErrorScreen';

jest.mock('@/styles/customIcons', () => ({
  ErrorIcon: () => <div data-testid="error-icon" />
}));

interface Props {
  onClick: () => void;
}

jest.mock('@heroicons/react/24/outline', () => ({
  ArrowPathIcon: (props: Props) => <div data-testid="reload-icon" {...props} />
}));

describe('ErrorScreen Component', () => {
  it('renders the error icon correctly', () => {
    render(<ErrorScreen onClick={() => {}} />);
    const errorIcon = screen.getByTestId('error-icon');
    expect(errorIcon).toBeInTheDocument();
  });

  it('renders the Ops! text correctly', () => {
    render(<ErrorScreen onClick={() => {}} />);
    const opsText = screen.getByText('Ops!');
    expect(opsText).toBeInTheDocument();
  });

  it('renders the error message correctly', () => {
    render(<ErrorScreen onClick={() => {}} />);
    const errorMessage = screen.getByText(
      /Parece que algo deu errado no seu caminho para a cozinha.../i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('calls onClick function when ArrowPathIcon is clicked', () => {
    const handleClick = jest.fn();
    render(<ErrorScreen onClick={handleClick} />);

    const reloadIcon = screen.getByTestId('reload-icon');
    fireEvent.click(reloadIcon);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
