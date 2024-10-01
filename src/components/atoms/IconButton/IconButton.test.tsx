// __tests__/IconButton.test.tsx

import { fireEvent, render, screen } from '@testing-library/react';

import IconButton from './IconButton';

const MockOutlineIcon = jest.fn(() => <div data-testid="outline-icon">Outline Icon</div>);
const MockSolidIcon = jest.fn(() => <div data-testid="solid-icon">Solid Icon</div>);

describe('IconButton Component', () => {
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders OutlineIcon when not active', () => {
    render(
      <IconButton
        isActive={false}
        outlineIcon={MockOutlineIcon}
        solidIcon={MockSolidIcon}
        onClick={onClickMock}
      />
    );

    expect(screen.getByTestId('outline-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('solid-icon')).not.toBeInTheDocument();
  });

  it('renders SolidIcon when active', () => {
    render(
      <IconButton
        isActive={true}
        outlineIcon={MockOutlineIcon}
        solidIcon={MockSolidIcon}
        onClick={onClickMock}
      />
    );

    expect(screen.getByTestId('solid-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('outline-icon')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(
      <IconButton
        isActive={false}
        outlineIcon={MockOutlineIcon}
        solidIcon={MockSolidIcon}
        onClick={onClickMock}
      />
    );

    const button = screen.getByTestId('outline-icon');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
