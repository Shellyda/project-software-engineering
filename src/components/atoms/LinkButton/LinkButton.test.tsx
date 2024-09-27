import { render, screen } from '@testing-library/react';
import React from 'react';

import LinkButton from './LinkButton'; // Ajuste o caminho da importação conforme necessário

describe('LinkButton Component', () => {
  test('renders with default text', () => {
    render(<LinkButton>ver mais</LinkButton>);

    const buttonElement = screen.getByRole('button', { name: /ver mais/i });

    // Verifica se o botão existe no DOM
    expect(buttonElement).not.toBeNull();

    // Verifica se as classes base estão presentes
    expect(buttonElement.className).toContain('bg-transparent');
    expect(buttonElement.className).toContain('text-secondary-base');
    expect(buttonElement.className).toContain('underline');
    expect(buttonElement.className).toContain('font-bold');
    expect(buttonElement.className).toContain('text-base');
    expect(buttonElement.className).toContain('rounded');
    expect(buttonElement.className).toContain('outline-none');
    expect(buttonElement.className).toContain('transition');
    expect(buttonElement.className).toContain('duration-200');

    // Verifica se o texto padrão é 'ver mais'
    expect(buttonElement.textContent).toBe('ver mais');
  });

  test('renders with custom text', () => {
    render(<LinkButton>Custom Text</LinkButton>);

    const buttonElement = screen.getByRole('button', { name: /custom text/i });

    // Verifica se o botão existe no DOM
    expect(buttonElement).not.toBeNull();

    // Verifica se o texto é o esperado
    expect(buttonElement.textContent).toBe('Custom Text');
  });

  test('applies custom className', () => {
    render(<LinkButton className="extra-class">Custom Class</LinkButton>);

    const buttonElement = screen.getByRole('button', { name: /custom class/i });

    // Verifica se o botão existe no DOM
    expect(buttonElement).not.toBeNull();

    // Verifica se a classe extra foi aplicada
    expect(buttonElement.className).toContain('extra-class');
  });

  test('executes onClick event', () => {
    const handleClick = jest.fn();
    render(<LinkButton onClick={handleClick}>Click Me</LinkButton>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // Verifica se o botão existe no DOM
    expect(buttonElement).not.toBeNull();

    // Simula um clique no botão
    buttonElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
