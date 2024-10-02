// layout.tsx
import '@/styles/globals.css';
import { Young_Serif } from 'next/font/google';
import { ReactNode } from 'react';

import { MainProvider } from '@/components/providers/MainProvider';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider/ReactQueryProvider';

import { cn } from '@/lib/utils';

import ResponsiveWrapper from './responsive'; // Import the new component

const youngSerif = Young_Serif({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: '400'
});

export const metadata = {
  title: 'Me Passa a Receita aí!',
  description:
    'Me passa a receita aí? é uma plataforma que permite aos usuários explorar uma ampla variedade de receitas compartilhadas por uma comunidade de amantes da culinária. Os usuários podem contribuir compartilhando suas próprias receitas, fornecendo feedback através de comentários e avaliando as receitas que experimentam.'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="pt-BR">
      <body className={cn(youngSerif.variable, 'font-primary')} suppressHydrationWarning>
        <MainProvider>
          <ReactQueryProvider>
            <ResponsiveWrapper>{children}</ResponsiveWrapper>
          </ReactQueryProvider>
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
