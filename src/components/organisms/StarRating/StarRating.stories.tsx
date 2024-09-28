import type { Meta, StoryObj } from '@storybook/react';

import StarRating from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'Organisms/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  args: {}
};

export default meta;

type Story = StoryObj<typeof StarRating>;

export const Default: Story = {};
