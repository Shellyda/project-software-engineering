import { render, screen } from '@testing-library/react';
import React from 'react';

import DetailsButton from './DetailsButton'; // Adjust the import path as necessary

describe('DetailsButton Component', () => {
  test('renders with default text', () => {
    render(<DetailsButton />);

    const buttonElement = screen.getByRole('button', { name: /ver mais/i });

    // Verify if the button exists in the DOM
    expect(buttonElement).not.toBeNull();

    // Check the default button styles
    expect(buttonElement.className).toContain('bg-base');
    expect(buttonElement.className).toContain('text-black');
    expect(buttonElement.className).toContain('font-bold');
    expect(buttonElement.className).toContain('rounded-full');

    // Check the text content directly
    expect(buttonElement.textContent).toBe('ver mais');
  });

  test('renders with custom text', () => {
    render(<DetailsButton>Custom Text</DetailsButton>);

    const buttonElement = screen.getByRole('button', { name: /custom text/i });

    // Verify if the button exists in the DOM
    expect(buttonElement).not.toBeNull();

    // Check the text content directly
    expect(buttonElement.textContent).toBe('Custom Text');
  });

  test('applies custom className', () => {
    render(<DetailsButton className="extra-class">Custom Class</DetailsButton>);

    const buttonElement = screen.getByRole('button', { name: /custom class/i });

    // Verify if the button exists in the DOM
    expect(buttonElement).not.toBeNull();

    // Check if the custom class is applied
    expect(buttonElement.className).toContain('extra-class');
  });

  test('executes onClick event', () => {
    const handleClick = jest.fn();
    render(<DetailsButton onClick={handleClick}>Click Me</DetailsButton>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // Verify if the button exists in the DOM
    expect(buttonElement).not.toBeNull();

    // Simulate a click event
    buttonElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
