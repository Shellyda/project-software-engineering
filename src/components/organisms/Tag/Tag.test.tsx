/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import React from 'react';

import Tag from './Tag'; // Adjust the import path as necessary

describe('Tag Component', () => {
  it('renders with the correct id and value', () => {
    const testId = 'test-id';
    const testValue = 'Test Tag';

    render(<Tag id={testId} value={testValue} />);

    // Check if the tag with the correct value is rendered
    const tagElement = screen.getByText(testValue);
    const parentDiv = tagElement.closest('div');

    // Verify the id is correct by checking the innerHTML
    expect(tagElement.innerHTML).toBe(testValue);
    expect(parentDiv?.id).toBe(testId);
  });

  it('applies additional props correctly', () => {
    const testId = 'test-id';
    const testValue = 'Test Tag';

    // Pass additional props
    render(<Tag id={testId} value={testValue} data-testid="custom-id" />);

    // Check if the additional props are applied
    const tagElement = screen.getByText(testValue);
    const parentDiv = tagElement.closest('div');

    // Verify that the data-testid is set correctly
    expect(parentDiv?.getAttribute('data-testid')).toBe('custom-id');
    expect(parentDiv?.id).toBe(testId);
  });

  it('truncates long text', () => {
    const testId = 'test-id';
    const longValue = 'This is a very long tag that should be truncated';

    render(<Tag id={testId} value={longValue} />);

    const tagElement = screen.getByText(longValue);

    // Check if the tag text contains the expected class for truncation
    expect(tagElement.className).toContain('truncate');
  });
});
