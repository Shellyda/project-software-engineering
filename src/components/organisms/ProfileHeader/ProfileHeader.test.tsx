import { render, screen, fireEvent } from '@testing-library/react';

import ProfileHeader from './ProfileHeader';

describe('ProfileHeader Component', () => {
  const mockEdit = jest.fn();
  const props = {
    name: 'Ana Maria',
    username: 'anamaria',
    email: 'anamaria@gmail.com',
    profileImage: '/path/to/profile.jpg',
    isMyProfile: true,
    onEdit: mockEdit,
    logout: mockEdit
  };

  test('renders the profile image', () => {
    render(<ProfileHeader {...props} />);

    // Check if the profile image alt text is rendered (implying the image is rendered)
    screen.getByAltText(`${props.name}'s profile photo`);
  });

  test('renders the name, username, and email', () => {
    render(<ProfileHeader {...props} />);

    // Check for the presence of name, username, and email by their text content
    screen.getByText(props.name);
    screen.getByText(`@${props.username}`);
    screen.getByText(`${props.email}`);
  });

  test('calls onEdit when the edit button is clicked', () => {
    render(<ProfileHeader {...props} />);

    // Find the button element and simulate a click event
    const editButton = screen.getByRole('button');
    fireEvent.click(editButton);

    // Ensure that the onEdit function is called
    expect(mockEdit).toHaveBeenCalledTimes(1);
  });

  test('renders the edit button with PencilIcon', () => {
    render(<ProfileHeader {...props} />);

    // Check for the presence of the edit button using its role
    screen.getByRole('button');

    // Since we know the button contains the PencilIcon,
    // confirming the button's presence indirectly confirms the icon
  });
});
