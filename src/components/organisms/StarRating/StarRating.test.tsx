import { render, screen, fireEvent } from '@testing-library/react';

import StarRating from './StarRating'; // Adjust the import path as necessary

describe('StarRating Component', () => {
  it('renders the initial rating', () => {
    render(<StarRating initialRating={3} disabled={true} />);

    // Check if the stars contain the correct filled state
    expect(screen.getByRole('button', { name: '1' }).id).toContain('text-primary');
    expect(screen.getByRole('button', { name: '2' }).id).toContain('text-primary');
    expect(screen.getByRole('button', { name: '3' }).id).toContain('text-primary');
    expect(screen.getByRole('button', { name: '4' }).id).toContain('secondary-base');
    expect(screen.getByRole('button', { name: '5' }).id).toContain('secondary-base');
  });

  it('allows voting when not disabled', () => {
    const handleVote = jest.fn();
    render(<StarRating onVote={handleVote} disabled={false} />);

    // Simulate clicking the 4th star
    fireEvent.click(screen.getByRole('button', { name: '4' }));

    // Check if the onVote function was called with the correct rating
    expect(handleVote).toHaveBeenCalledWith(4);

    // Check if the star states have changed accordingly
    expect(screen.getByRole('button', { name: '4' }).id).toContain('text-primary');
    expect(screen.getByRole('button', { name: '5' }).id).toContain('secondary-base');
  });

  it('does not allow voting when disabled', () => {
    const handleVote = jest.fn();
    render(<StarRating onVote={handleVote} disabled={true} />);

    // Try clicking the stars
    fireEvent.click(screen.getByRole('button', { name: '5' }));

    // Check if the onVote function was not called
    expect(handleVote).not.toHaveBeenCalled();
  });
});
