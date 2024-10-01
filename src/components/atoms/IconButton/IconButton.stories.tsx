import type { Meta, StoryObj } from '@storybook/react';

import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
