import type { Meta, StoryObj } from '@storybook/react';

import ErrorScreen from './ErrorScreen';

const meta: Meta<typeof ErrorScreen> = {
  title: 'Templates/ErrorScreen',
  component: ErrorScreen,
  tags: ['autodocs'],
  args: {
    children: 'Example',
    variant: 'default'
  }
};

export default meta;

type Story = StoryObj<typeof ErrorScreen>;

export const Default: Story = {};
