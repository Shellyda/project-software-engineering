import type { Meta, StoryObj } from '@storybook/react';

import SwitchTabs from './SwitchTabs';

const meta: Meta<typeof SwitchTabs> = {
  title: 'Organisms/SwitchTabs',
  component: SwitchTabs,
  tags: ['autodocs'],
  args: {}
};

export default meta;

type Story = StoryObj<typeof SwitchTabs>;
const tabs = [
  { id: '0', title: 'Tab 1', content: <p>Content for Tab 1</p>, path: 'tab1' },
  { id: '1', title: 'Tab 2', content: <p>Content for Tab 2</p>, path: 'tab2' },
  { id: '2', title: 'Tab 3', content: <p>Content for Tab 3</p>, path: 'tab3' }
];

export const Default: Story = {};
Default.args = {
  tabs
};
