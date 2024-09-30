import React from 'react';

import { BaseLayout } from '@/components/templates/BaseLayout';

import RecipeInformation from '../../components/atoms/RecipeInformation';

const Profile = () => (
  <div>
    <BaseLayout>
      <RecipeInformation
        initialRating={3}
        time={45}
        type="Almoço"
        name="Abóboras maciças"
        date="11/03/2001"
        tags={['vegano', 'fácil', 'Até 15 min']}
      />
      <h1>Profile</h1>
    </BaseLayout>
  </div>
);

export default Profile;
