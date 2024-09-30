import '@/styles/globals.css';

import { Metadata } from 'next';
import { Young_Serif } from 'next/font/google';
import { ReactNode } from 'react';

import { MainProvider } from '@/components/providers/MainProvider';

import { cn } from '@/lib/utils';

const youngSerif = Young_Serif({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: '400'
});

export const metadata: Metadata = {
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
          <main>{children}</main>
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
