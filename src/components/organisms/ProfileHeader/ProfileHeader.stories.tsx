import type { Meta, StoryObj } from '@storybook/react';

import ProfileHeader from './ProfileHeader';

const meta: Meta<typeof ProfileHeader> = {
  title: 'Organisms/ProfileHeader',
  component: ProfileHeader,
  tags: ['autodocs'],
  args: {}
};

export default meta;

type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {};
Default.args = {
  onEdit: () => null,
  name: 'Ana Maria',
  email: 'anamaria@gmail.com',
  username: 'lorojose',
  profileImage:
    'https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D'
};
