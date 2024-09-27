import LinkButton from '@/components/atoms/LinkButton';
import { BaseLayout } from '@/components/templates/BaseLayout';

const HomePage = () => (
  <div>
    <BaseLayout>
      <LinkButton>Clique me!</LinkButton>
      <h1>Home</h1>
    </BaseLayout>
  </div>
);

export default HomePage;
