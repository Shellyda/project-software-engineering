import React, { ReactNode } from 'react';

// import { cn } from '@/lib/utils';

interface BaseLayout {
  children: ReactNode;
  className?: string;
}

export const BaseLayout = ({ children }: BaseLayout) => {
  // const wrapperStyles = cn('flex flex-col min-h-screen', className);

  return <main className="bg-base flex-1 min-h-screen w-full">{children}</main>;
};
