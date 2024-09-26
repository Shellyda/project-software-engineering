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
  title: 'Receita aí!',
  description:
    '🚀 Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged, Jest, React Testing Library, PostCSS, Tailwind CSS, Storybook, Plop, GH actions.'
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
