import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../../../hooks/useAuth';
import { BaseLayout } from './BaseLayout';

jest.mock('../../../hooks/useAuth');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));
jest.mock('@/components/molecules/Menu', () => ({
  Menu: () => <div data-testid="menu">menu</div>
}));

describe('BaseLayout', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading screen when isLoading is true', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoading: true, user: null });

    render(<BaseLayout>Test Content</BaseLayout>);

    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });

  it('should redirect to /search when user is null and isLoading is false', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoading: false, user: null });

    render(<BaseLayout>Test Content</BaseLayout>);

    expect(mockRouter.push).toHaveBeenCalledWith('/search');
  });

  it('should show error screen when there is an error', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoading: false, isError: true });

    render(<BaseLayout>Test Content</BaseLayout>);

    expect(screen.getByTestId('error-screen')).toBeInTheDocument();
  });

  it('should render children and Menu when user is present', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoading: false, user: { name: 'Test User' } });

    render(<BaseLayout>Test Content</BaseLayout>);

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });
});
