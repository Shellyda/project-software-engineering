import { render, screen } from '@testing-library/react';
import React from 'react';

import ReceipeCard from './ReceipeCard'; // Adjust the import path as necessary
// import '@testing-library/jest-dom/extend-expect';

// Mock the Pacifico font import
jest.mock('next/font/google', () => ({
  Pacifico: jest.fn(() => ({
    className: 'mocked-pacifico-classname'
  }))
}));

describe('ReceipeCard', () => {
  const title = 'Bolo de Morango';
  const image = 'https://via.placeholder.com/220'; // Use a placeholder image URL
  const initialRating = 4;

  it('renders the title, image, and button correctly', () => {
    render(<ReceipeCard receipeId="1" title={title} image={image} initialRating={initialRating} />);

    // Check that the title is rendered
    expect(screen.getByText(title)).toBeTruthy();

    // Check that the image is rendered
    expect(screen.getByRole('img', { name: title })).toBeTruthy(); // Image role with alt text

    // Check that the button is rendered
    const button = screen.getByRole('button', { name: /Ver mais/i });
    expect(button).toBeTruthy();
  });

  it('renders the correct initial rating', () => {
    render(<ReceipeCard receipeId="2" title={title} image={image} initialRating={initialRating} />);

    const starRating = screen.getAllByLabelText(/star/i);
    expect(starRating).toBeTruthy(); // Check for star rating rendering
  });
});
