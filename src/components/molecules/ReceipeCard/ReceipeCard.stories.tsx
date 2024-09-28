import type { Meta, StoryObj } from '@storybook/react';

import ReceipeCard from './ReceipeCard';

const meta: Meta<typeof ReceipeCard> = {
  title: 'Molecules/ReceipeCard',
  component: ReceipeCard,
  tags: ['autodocs'],
  args: {
    children: 'Example'
  }
};

export default meta;

type Story = StoryObj<typeof ReceipeCard>;

export const Default: Story = {};
