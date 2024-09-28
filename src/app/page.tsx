import Slider from '@/components/atoms/Slider';
import ReceipeCard from '@/components/molecules/ReceipeCard';
import { BaseLayout } from '@/components/templates/BaseLayout';

const HomePage = () => (
  <div>
    <BaseLayout>
      <Slider>
        <ReceipeCard
          title="Bolo de rolo"
          image="https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
          initialRating={3}
          receipeId="1"
        />
        <ReceipeCard
          title="Bolo de rolo"
          image="https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
          initialRating={3}
          receipeId="1"
        />
        <ReceipeCard
          title="Bolo de rolo"
          image="https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
          initialRating={3}
          receipeId="1"
        />
        <ReceipeCard
          title="Bolo de rolo"
          image="https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
          initialRating={3}
          receipeId="1"
        />
      </Slider>
      <h1>Home</h1>
    </BaseLayout>
  </div>
);

export default HomePage;
