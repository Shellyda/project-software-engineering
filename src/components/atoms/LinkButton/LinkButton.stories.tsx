import type { Meta, StoryObj } from '@storybook/react';

import LinkButton from './LinkButton';

const meta: Meta<typeof LinkButton> = {
  title: 'Atoms/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  args: {
    children: 'Example'
  }
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {};
