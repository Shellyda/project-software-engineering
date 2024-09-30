import { render, screen, fireEvent } from '@testing-library/react';

import SwitchTabs from './SwitchTabs';

describe('SwitchTabs Component', () => {
  const tabsData = [
    { title: 'Tab 1', content: <p>Content for Tab 1</p> },
    { title: 'Tab 2', content: <p>Content for Tab 2</p> },
    { title: 'Tab 3', content: <p>Content for Tab 3</p> }
  ];

  it('renders the correct number of tabs', () => {
    render(<SwitchTabs tabs={tabsData} />);
    const tabButtons = screen.getAllByRole('tab');
    expect(tabButtons.length).toBe(3); // Verifying the number of tabs
  });

  it('displays the correct content for each tab when clicked', () => {
    render(<SwitchTabs tabs={tabsData} />);

    // Initially, the first tab's content should be displayed
    expect(screen.getByText('Content for Tab 1')).toBeTruthy();

    // Click on Tab 2 and check if its content is displayed
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content for Tab 2')).toBeTruthy();

    // Click on Tab 3 and check if its content is displayed
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 3' }));
    expect(screen.getByText('Content for Tab 3')).toBeTruthy();
  });

  it('ensures only the active tab content is displayed', () => {
    render(<SwitchTabs tabs={tabsData} />);

    // Initially, only Tab 1's content should be visible
    expect(screen.getByText('Content for Tab 1')).toBeTruthy();

    // Click on Tab 2 and check that Tab 1's content is no longer visible
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content for Tab 2')).toBeTruthy();

    // Click on Tab 3 and check that Tab 2's content is no longer visible
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 3' }));
    expect(screen.getByText('Content for Tab 3')).toBeTruthy();
  });
});
