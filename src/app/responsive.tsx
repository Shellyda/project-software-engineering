// components/ResponsiveWrapper.tsx
'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { MainLayout } from '@/components/templates/MainLayout';

import Logo from '../../public/Logo.svg'; // Adjust the path as necessary

const RenderWarnComponent = () => (
  <MainLayout>
    <div className="flex flex-col justify-center items-center h-screen">
      <Image alt="Logo" src={Logo} />
      <text className="text-xl text-center mt-8">
        Pedimos desculpas! Nosso time ainda está trabalhando em novas versões para Desktop.
      </text>
      <text className="text-xl text-center my-8">
        Enquanto isso, aproveite o Receita Aí na versão mobile.
      </text>
    </div>
  </MainLayout>
);

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);

  const handleResize = () => {
    const match = window.matchMedia('(max-width: 768px)');
    setIsTabletOrSmaller(match.matches);
  };

  useEffect(() => {
    // Call on initial render
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{isTabletOrSmaller ? children : <RenderWarnComponent />}</>;
};

export default ResponsiveWrapper;
