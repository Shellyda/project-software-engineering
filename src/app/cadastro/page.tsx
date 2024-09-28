'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';

import Button from '@/components/atoms/Button/Button';
import LinkButton from '@/components/atoms/LinkButton';
import TextInput from '@/components/atoms/TextInput';
import { MainLayout } from '@/components/templates/MainLayout';

import Logo from '../../../public/Logo.svg'; // Adjust the path as necessary

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRedirectToLogin = () => {
    router.push('/login'); // Redirect to /cadastro
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
          <form aria-label="form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextInput
                label="Apelido"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <TextInput
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <TextInput
                label="Senha"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" variant="default" style={{ width: '100%' }}>
              Criar conta
            </Button>
          </form>
          <div className="flex justify-center items-center py-4">
            <LinkButton onClick={handleRedirectToLogin}>Fazer login</LinkButton>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default SignUpPage;
