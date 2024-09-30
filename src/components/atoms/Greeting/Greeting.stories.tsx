import type { Meta, StoryObj } from '@storybook/react';

import Greeting from './Greeting';

const meta: Meta<typeof Greeting> = {
  title: 'Atoms/Greeting',
  component: Greeting,
  tags: ['autodocs'],
  args: {},
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
};

export default meta;

type Story = StoryObj<typeof Greeting>;

export const Default: Story = {};
Default.args = {
  title: 'Olá, Chef',
  isAuthenticated: true,
  userImage:
    'https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D'
};
