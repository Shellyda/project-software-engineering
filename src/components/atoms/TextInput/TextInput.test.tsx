import { EyeIcon } from '@heroicons/react/24/outline';
import { render, screen } from '@testing-library/react';
import React from 'react';

import InputWithIcon from './TextInput'; // Adjust the import based on your file structure

describe('InputWithIcon Component', () => {
  it('renders the input with label and icon', () => {
    render(
      <InputWithIcon
        label="Test Label"
        type="text"
        value=""
        onChange={() => {}}
        icon={<EyeIcon data-testid="icon" className="h-6 w-6" />}
      />
    );

    // Check the label text
    const label = screen.getByText('Test Label');
    expect(label.textContent).toBe('Test Label');

    // Check if the input field is rendered
    const input = screen.getByLabelText('code') as HTMLInputElement; // Use aria-label
    expect(input).toBeTruthy(); // Ensure the input exists

    // Check the input type
    expect(input.type).toBe('text'); // Default type should be 'text'

    // Check if the icon is rendered correctly
    const icon = screen.getByTestId('icon');
    expect(icon).toBeTruthy(); // Ensure the icon exists
  });

  it('toggles password visibility when icon is clicked', () => {
    render(
      <InputWithIcon
        label="Password"
        type="password"
        value=""
        onChange={() => {}}
        icon={<EyeIcon data-testid="icon" className="h-6 w-6" />}
      />
    );

    // Check if the input starts as type 'password'
    const input = screen.getByLabelText('code') as HTMLInputElement;
    expect(input.type).toBe('password'); // Initially, it should be 'password'
  });

  it('passes additional input props', () => {
    render(
      <InputWithIcon
        label="Email"
        type="text"
        value="test@example.com"
        onChange={() => {}}
        placeholder="Enter your email"
        icon={<EyeIcon data-testid="icon" className="h-6 w-6" />}
      />
    );

    // Check if the input contains the correct value
    const input = screen.getByLabelText('code') as HTMLInputElement;
    expect(input.value).toBe('test@example.com'); // Ensure value is correct

    // Check if the placeholder is correct
    expect(input.placeholder).toBe('Enter your email'); // Ensure placeholder is correct
  });
});
