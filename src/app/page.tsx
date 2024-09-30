import Greeting from '@/components/atoms/Greeting';
import { BaseLayout } from '@/components/templates/BaseLayout';

const HomePage = () => (
  <div>
    <BaseLayout>
      <Greeting
        title="Olá, Chef"
        isAuthenticated={true}
        userImage="https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
      />
    </BaseLayout>
  </div>
);

export default HomePage;
