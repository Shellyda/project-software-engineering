import type { Meta, StoryObj } from '@storybook/react';

import RecipeInformation from './RecipeInformation';

const meta: Meta<typeof RecipeInformation> = {
  title: 'Atoms/RecipeInformation',
  component: RecipeInformation,
  tags: ['autodocs'],
  args: {}
};

export default meta;

type Story = StoryObj<typeof RecipeInformation>;

export const Default: Story = {};
Default.args = {
  initialRating: 3,
  time: 15,
  type: 'Almoço',
  name: 'Abóboras maciças',
  date: '11/03/2001',
  tags: ['vegano', 'fácil', 'Até 15 min']
};
