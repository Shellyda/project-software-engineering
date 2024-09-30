'use client';
import React from 'react';

import ProfileHeader from '@/components/organisms/ProfileHeader';
import { BaseLayout } from '@/components/templates/BaseLayout';

import RecipeInformation from '../../components/atoms/RecipeInformation';

const Profile = () => (
  <div>
    <BaseLayout>
      <ProfileHeader
        onEdit={() => null}
        name="Ana Maria"
        email="anamaria@gmail.com"
        username="lorojose"
        profileImage="https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
      />
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
