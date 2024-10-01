import type { Meta, StoryObj } from '@storybook/react';

import { SplashScreen } from './SplashScreen';

const meta: Meta<typeof SplashScreen> = {
  title: 'Templates/SplashScreen',
  component: SplashScreen,
  tags: ['autodocs'],
  args: {
    children: 'Example',
    variant: 'default'
  }
};

export default meta;

type Story = StoryObj<typeof SplashScreen>;

export const Default: Story = {};
