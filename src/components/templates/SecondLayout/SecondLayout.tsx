import React, { ReactNode } from 'react';

// import { cn } from '@/lib/utils';

interface SecondLayout {
  children: ReactNode;
  className?: string;
}

export const SecondLayout = ({ children }: SecondLayout) => {
  // const wrapperStyles = cn('flex flex-col min-h-screen', className);

  return <main className="bg-secondary flex-1 min-h-screen w-full">{children}</main>;
};
