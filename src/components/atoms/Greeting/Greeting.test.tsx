import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import Greeting from './Greeting';
import '@testing-library/jest-dom';

// Mock the next/navigation useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Greeting Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders title and user image when authenticated', () => {
    render(<Greeting isAuthenticated={true} title="Olá, Chef" userImage="/path/to/image.jpg" />);

    // Check if the title is rendered by checking its text content
    const titleElement = screen.getByText('Olá, Chef');
    expect(titleElement).toHaveTextContent('Olá, Chef');

    // Check if the image is rendered by its alt attribute
    const image = screen.getByAltText('Profile Picture');
    expect(image).toHaveAttribute('src', '/_next/image?url=%2Fpath%2Fto%2Fimage.jpg&w=128&q=75');
  });

  test('renders Log In button when not authenticated', () => {
    render(<Greeting isAuthenticated={false} title="Olá, Guest" />);

    // Check if the title is rendered by checking its text content
    const titleElement = screen.getByText('Olá, Guest');
    expect(titleElement).toHaveTextContent('Olá, Guest');

    // Check if the Log In button is rendered by checking its role and text content
    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toHaveTextContent('Log In');
  });

  test('calls router.push("/login") when Log In button is clicked', () => {
    render(<Greeting isAuthenticated={false} title="Olá, Guest" />);

    // Find the Log In button and simulate a click
    const loginButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(loginButton);

    // Check if router.push was called with '/login'
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});
