import type { Meta, StoryObj } from '@storybook/react';

import TextInput from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Atoms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {}
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};
