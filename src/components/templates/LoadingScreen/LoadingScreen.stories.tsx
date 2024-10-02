import type { Meta, StoryObj } from '@storybook/react';

import LoadingScreen from './LoadingScreen';

const meta: Meta<typeof LoadingScreen> = {
  title: 'Templates/LoadingScreen',
  component: LoadingScreen,
  tags: ['autodocs'],
  args: {
    children: 'Example',
    variant: 'default'
  }
};

export default meta;

type Story = StoryObj<typeof LoadingScreen>;

export const Default: Story = {};
