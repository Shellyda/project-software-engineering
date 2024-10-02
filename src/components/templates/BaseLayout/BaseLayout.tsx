import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { Menu } from '@/components/molecules/Menu';

import { useAuth } from '../../../hooks/useAuth';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import { LoadingScreen } from '../LoadingScreen';

interface BaseLayout {
  children: ReactNode;
  className?: string;
}

export const BaseLayout = ({ children }: BaseLayout) => {
  const router = useRouter();
  const { user, isLoading, isError } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen onClick={() => router.push('/login')} />;
  }

  return (
    <>
      <main className="px-4 py-4 pb-20 bg-base flex-1 min-h-screen w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      {!!user && <Menu />}
    </>
  );
};
