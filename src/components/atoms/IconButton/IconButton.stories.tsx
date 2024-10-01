// IconButton.stories.tsx

import { Meta, StoryFn } from '@storybook/react';

import IconButton from './IconButton';
import HomeOutlineIcon from './icons/HomeOutlineIcon.svg';
import HomeSolidIcon from './icons/HomeSolidIcon.svg';
import { IconButtonProps } from './interfaces';

const meta: Meta<IconButtonProps> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    isActive: {
      control: { type: 'boolean' }
    },
    onClick: { action: 'clicked' }
  }
};

export default meta;

const Template: StoryFn<IconButtonProps> = (args: IconButtonProps) => <IconButton {...args} />;

export const Outline = Template.bind({});
Outline.args = {
  isActive: false,
  outlineIcon: HomeOutlineIcon,
  solidIcon: HomeSolidIcon,
  onClick: () => {},
  width: 32,
  height: 32
};

export const Solid = Template.bind({});
Solid.args = {
  isActive: true,
  outlineIcon: HomeOutlineIcon,
  solidIcon: HomeSolidIcon,
  onClick: () => {},
  width: 32,
  height: 32
};
