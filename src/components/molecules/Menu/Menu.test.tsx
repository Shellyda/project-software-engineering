import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Menu } from './Menu';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn()
}));

const mockPush = jest.fn();

describe('Menu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders all icon buttons', () => {
    (usePathname as jest.Mock).mockReturnValue('/home');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<Menu />);

    expect(screen.getAllByTestId('solid-icon')).toHaveLength(1);
    expect(screen.getAllByTestId('outline-icon')).toHaveLength(4);
  });

  it('sets the active icon based on the current route', () => {
    (usePathname as jest.Mock).mockReturnValue('/home');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<Menu />);

    expect(screen.getByTestId('solid-icon')).toBeInTheDocument();
  });

  it('calls router.push when an icon is clicked', () => {
    (usePathname as jest.Mock).mockReturnValue('/home');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<Menu />);

    const homeIconButton = screen.getByTestId('solid-icon');
    fireEvent.click(homeIconButton);

    expect(mockPush).toHaveBeenCalledWith('home');
  });

  it('correctly sets the active route for search', () => {
    (usePathname as jest.Mock).mockReturnValue('/search');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<Menu />);

    expect(screen.getByTestId('solid-icon')).toBeInTheDocument();
  });

  it('correctly sets the active route for recipe creation', () => {
    (usePathname as jest.Mock).mockReturnValue('/recipe-creation');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<Menu />);

    expect(screen.getByTestId('solid-icon')).toBeInTheDocument();
  });

  it('correctly sets the active route for profile reviews', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('tab=reviews'));

    render(<Menu />);

    expect(screen.getByTestId('solid-icon')).toBeInTheDocument();
  });
});
