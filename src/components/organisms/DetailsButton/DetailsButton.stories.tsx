import type { Meta, StoryObj } from '@storybook/react';

import DetailsButton from './DetailsButton';

const meta: Meta<typeof DetailsButton> = {
  title: 'Organisms/DetailsButton',
  component: DetailsButton,
  tags: ['autodocs'],
  args: {
    children: 'Example'
  }
};

export default meta;

type Story = StoryObj<typeof DetailsButton>;

export const Default: Story = {};
