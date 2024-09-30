import { ReactNode } from 'react';

// import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  // const wrapperStyles = cn('flex flex-col min-h-screen', className);

  return (
    <main className="px-4 py-4 bg-primary flex-1 min-h-screen w-full max-w-full overflow-x-hidden">
      {children}
    </main>
  );
};
