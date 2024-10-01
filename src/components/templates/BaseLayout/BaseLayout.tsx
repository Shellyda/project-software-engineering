import { ReactNode } from 'react';

import { Menu } from '@/components/molecules/Menu';
// import { cn } from '@/lib/utils';

interface BaseLayout {
  children: ReactNode;
  className?: string;
}

export const BaseLayout = ({ children }: BaseLayout) => {
  // const wrapperStyles = cn('flex flex-col min-h-screen', className);

  return (
    <>
      <main className="px-4 py-4 pb-20 bg-base flex-1 min-h-screen w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <Menu />
    </>
  );
};
