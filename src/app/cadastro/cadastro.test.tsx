/* eslint-disable testing-library/no-render-in-lifecycle */
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import SignUpPage from './page';

describe('SignUpPage Component', () => {
  beforeEach(() => {
    render(<SignUpPage />);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls and instances after each test
  });

  it('renders the logo', () => {
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeTruthy(); // Checks if the logo is rendered
  });

  it('displays the correct title', () => {
    expect(screen.getByText('Me passa a')).toBeTruthy();
    expect(screen.getByText('receita aí')).toBeTruthy();
  });

  it('has input fields for name, email, and password', () => {
    expect(screen.getByPlaceholderText('Enter your name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your password')).toBeTruthy();
  });

  it('updates the input fields on change', () => {
    const nameInput = screen.getByPlaceholderText('Enter your name') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  // New test to check for the form submission behavior
  it('submits the form when submitted', () => {
    const nameInput = screen.getByPlaceholderText('Enter your name') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const form = screen.getByRole('form', { hidden: true }); // Use the appropriate role
    fireEvent.submit(form); // Trigger the form submission
  });
});
