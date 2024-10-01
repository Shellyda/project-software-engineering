import type { Meta, StoryObj } from '@storybook/react';

import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Molecules/Menu',
  component: Menu,
  tags: ['autodocs'],
  args: {
    children: 'Example',
    variant: 'default'
  }
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {};
