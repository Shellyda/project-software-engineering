'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import LinkButton from '@/components/atoms/LinkButton';
import TextInput from '@/components/atoms/TextInput';
import { MainLayout } from '@/components/templates/MainLayout';

import Logo from '../../../public/Logo.svg'; // Adjust the path as necessary

const LoginPage: React.FC = () => {
  // State to hold the email and password
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  // Handler for email change
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRedirectToRegister = () => {
    router.push('/sign-up'); // Redirect to /cadastro
  };

  // Handler for password change
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <MainLayout>
        <div className="flex flex-col justify-around h-screen">
          <div className="flex flex-col justify-center items-center py-4">
            <Image alt="Logo" src={Logo} />
            <text className="mt-8" style={{ fontSize: '2rem', textAlign: 'center' }}>
              Me passa a
            </text>
            <text style={{ fontSize: '2rem', textAlign: 'center' }}>receita aí</text>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextInput
                label="Email"
                type="email"
                value={email} // Bind the input value to state
                onChange={handleEmailChange} // Update state on change
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <TextInput
                label="Senha" // Keep the label in Portuguese for password
                type="password"
                value={password} // Bind the input value to state
                onChange={handlePasswordChange} // Update state on change
                placeholder="Enter your password" // Fixed placeholder text
                required
              />
            </div>

            <Button type="submit" variant="default" style={{ width: '100%' }}>
              Entrar
            </Button>
          </form>
          <div className="flex justify-center items-center py-4">
            <LinkButton onClick={handleRedirectToRegister}>Criar conta</LinkButton>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default LoginPage;
