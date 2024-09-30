import type { Meta, StoryObj } from '@storybook/react';

import { RecipeInformation } from './RecipeInformation';

const meta: Meta<typeof RecipeInformation> = {
  title: 'Atoms/RecipeInformation',
  component: RecipeInformation,
  tags: ['autodocs'],
  args: {
    children: 'Example',
    variant: 'default'
  }
};

export default meta;

type Story = StoryObj<typeof RecipeInformation>;

export const Default: Story = {};
