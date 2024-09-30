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
  { title: 'Tab 1', content: <p>Content for Tab 1</p> },
  { title: 'Tab 2', content: <p>Content for Tab 2</p> },
  { title: 'Tab 3', content: <p>Content for Tab 3</p> }
];

export const Default: Story = {};
Default.args = {
  tabs
};
