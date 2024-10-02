import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import LoadingScreen from './LoadingScreen';

describe('LoadingScreen component', () => {
  test('should render spinner', () => {
    render(<LoadingScreen />);

    const spinner = screen.getByTestId('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  test('should display the correct text', () => {
    render(<LoadingScreen />);

    const utensilsText = screen.getByText('Preparando os utensílios...');
    expect(utensilsText).toBeInTheDocument();

    const kitchenText = screen.getByText('Sua cozinha virtual já vai abrir!');
    expect(kitchenText).toBeInTheDocument();
  });

  test('spinner should have the correct size', () => {
    render(<LoadingScreen />);

    const spinner = screen.getByTestId('progressbar');
    expect(spinner).toHaveStyle('height: 80px');
    expect(spinner).toHaveStyle('width: 80px');
  });
});
