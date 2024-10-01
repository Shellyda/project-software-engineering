import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import SwitchTabs from './SwitchTabs';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('SwitchTabs Component', () => {
  const mockRouterPush = jest.fn();
  const tabsData = [
    { title: 'Tab 1', content: <p>Content for Tab 1</p>, path: 'tab1' },
    { title: 'Tab 2', content: <p>Content for Tab 2</p>, path: 'tab2' },
    { title: 'Tab 3', content: <p>Content for Tab 3</p>, path: 'tab3' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it('renders the correct number of tabs', () => {
    render(<SwitchTabs tabs={tabsData} activeTab="Tab 1" />);
    const tabButtons = screen.getAllByRole('tab');
    expect(tabButtons.length).toBe(3);
  });

  it('displays the correct content for each tab when clicked', () => {
    render(<SwitchTabs tabs={tabsData} activeTab="Tab 1" />);

    expect(screen.getByText('Content for Tab 1')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content for Tab 2')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: 'Tab 3' }));
    expect(screen.getByText('Content for Tab 3')).toBeTruthy();
  });

  it('changes the tab index when the activeTab prop changes', () => {
    const { rerender } = render(<SwitchTabs tabs={tabsData} activeTab="Tab 1" />);

    expect(screen.getByText('Content for Tab 1')).toBeTruthy();

    rerender(<SwitchTabs tabs={tabsData} activeTab="Tab 2" />);
    expect(screen.getByText('Content for Tab 2')).toBeTruthy();
  });

  it('navigates to the correct path when a tab is clicked', () => {
    render(<SwitchTabs tabs={tabsData} activeTab="Tab 1" />);

    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(mockRouterPush).toHaveBeenCalledWith('profile/?tab=tab2');

    fireEvent.click(screen.getByRole('tab', { name: 'Tab 3' }));
    expect(mockRouterPush).toHaveBeenCalledWith('profile/?tab=tab3');
  });
});
