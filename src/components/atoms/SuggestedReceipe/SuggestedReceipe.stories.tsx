import type { Meta, StoryObj } from '@storybook/react';

import SuggestedReceipe from './SuggestedReceipe';

const meta: Meta<typeof SuggestedReceipe> = {
  title: 'Atoms/SuggestedReceipe',
  component: SuggestedReceipe,
  tags: ['autodocs'],
  args: {
    children: 'Example'
  }
};

export default meta;

type Story = StoryObj<typeof SuggestedReceipe>;

export const Default: Story = {};
Default.args = {
  initialRating: 3,
  title: 'Poke de salmão',
  subtitle: 'Jantar',
  time: 60
};
