import type { Meta, StoryObj } from '@storybook/react';

import ReceipeCard from '@/components/molecules/ReceipeCard';

import Slider from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    children: 'Example'
  }
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <Slider>
      <ReceipeCard
        title="Bolo de Rolo"
        image="https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
        initialRating={3}
        receipeId="1"
      />
      <ReceipeCard
        title="Bolo de Rolo 2"
        image="https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
        initialRating={4}
        receipeId="2"
      />
      <ReceipeCard
        title="Bolo de Rolo 3"
        image="https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
        initialRating={5}
        receipeId="3"
      />
      <ReceipeCard
        title="Bolo de Rolo 3"
        image="https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
        initialRating={5}
        receipeId="3"
      />
      <ReceipeCard
        title="Bolo de Rolo 3"
        image="https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
        initialRating={5}
        receipeId="3"
      />
      {/* Add more ReceipeCards as needed */}
    </Slider>
  )
};
