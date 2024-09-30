// RecipeInformation.test.tsx

import { render, screen } from '@testing-library/react';

import RecipeInformation from './RecipeInformation';

describe('RecipeInformation Component', () => {
  const mockProps = {
    initialRating: 4,
    time: 30,
    type: 'Dinner',
    name: 'Pasta Primavera',
    date: '2024-09-30',
    tags: ['Vegan', 'Gluten-Free']
  };

  it('renders the component with all props correctly', () => {
    render(<RecipeInformation {...mockProps} />);

    // Check that the name is rendered
    const nameElement = screen.getByText(mockProps.name);
    expect(nameElement).toBeTruthy();

    // Check that the type is rendered
    const typeElement = screen.getByText(`${mockProps.type} -`);
    expect(typeElement).toBeTruthy();

    // Check that the time is rendered with "min"
    const timeElement = screen.getByText(`${mockProps.time}min`);
    expect(timeElement).toBeTruthy();

    // Check that the date is rendered
    const dateElement = screen.getByText(mockProps.date);
    expect(dateElement).toBeTruthy();

    // Check that the tags are rendered
    mockProps.tags.forEach((tag) => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeTruthy();
    });
  });
});
