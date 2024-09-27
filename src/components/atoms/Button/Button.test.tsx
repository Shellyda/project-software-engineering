import { render, screen } from '@testing-library/react';
import React from 'react';

import Button from './Button';

describe('Button Component', () => {
  test('renders default variant correctly', () => {
    render(<Button variant="default">Entrar</Button>);

    const buttonElement = screen.getByText('Entrar');

    // Verifica se o botão existe no DOM sem usar toBeInTheDocument ou matchers extras
    expect(buttonElement).not.toBeNull();

    // Verifica manualmente se as classes da variante default estão presentes
    expect(buttonElement.className).toContain('bg-black-primary');
    expect(buttonElement.className).toContain('text-white');
    expect(buttonElement.className).toContain('hover:bg-gray-800');
  });

  test('renders outline variant correctly', () => {
    render(<Button variant="outline">Email</Button>);

    const buttonElement = screen.getByText('Email');

    // Verifica se o botão existe no DOM
    expect(buttonElement).not.toBeNull();

    // Verifica manualmente se as classes da variante outline estão presentes
    expect(buttonElement.className).toContain('border-2');
    expect(buttonElement.className).toContain('border-black');
    expect(buttonElement.className).toContain('text-black');
    expect(buttonElement.className).toContain('hover:bg-gray-100');
  });
});
