import SuggestedReceipe from '@/components/atoms/SuggestedReceipe';
import { BaseLayout } from '@/components/templates/BaseLayout';

const HomePage = () => (
  <div>
    <BaseLayout>
      <SuggestedReceipe title="Poke de salmão" subtitle="Jantar" time={60} />
      <h1>Home</h1>
    </BaseLayout>
  </div>
);

export default HomePage;
