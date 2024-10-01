import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import SplashScreen from './SplashScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('SplashScreen', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it('renders the splash screen with loading message', () => {
    render(<SplashScreen />);

    expect(screen.getByText(/Me passa a/i)).toBeInTheDocument();
    expect(screen.getByText(/Receita aí\?/i)).toBeInTheDocument();

    expect(screen.getByAltText('Icon')).toBeInTheDocument();
  });

  it('navigates to /login after 3 seconds', async () => {
    render(<SplashScreen />);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/login'), { timeout: 3100 });
  });
});
