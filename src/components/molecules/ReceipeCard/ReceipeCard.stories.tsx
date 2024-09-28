import type { Meta, StoryObj } from '@storybook/react';

import ReceipeCard from './ReceipeCard';

const meta: Meta<typeof ReceipeCard> = {
  title: 'Molecules/ReceipeCard',
  component: ReceipeCard,
  tags: ['autodocs'],
  // Default args that will be passed to all stories
  args: {
    title: 'Bolo de rolo',
    image:
      'https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 3,
    receipeId: '1'
  }
};

export default meta;

type Story = StoryObj<typeof ReceipeCard>;

export const Default: Story = {};
