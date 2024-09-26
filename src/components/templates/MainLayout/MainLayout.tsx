import { ReactNode } from 'react';

// import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  // const wrapperStyles = cn('flex flex-col min-h-screen', className);

  return <main className="bg-primary flex-1 min-h-screen w-full">{children}</main>;
};
