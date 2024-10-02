'use client';

import { useAuth } from '@/hooks/useAuth';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import LinkButton from '@/components/atoms/LinkButton';
import TextInput from '@/components/atoms/TextInput';
import { MainLayout } from '@/components/templates/MainLayout';

import Logo from '../../../public/Logo.svg';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loading: false,
    error: null as string | null
  });
  const router = useRouter();
  const toast = useToast();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRedirectToRegister = () => {
    router.push('/sign-up');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormData((prev) => ({ ...prev, loading: true, error: null }));

    const { email, password } = formData;
    if (!email || !password) {
      setFormData((prev) => ({
        ...prev,
        error: 'Por favor, preencha todos os campos.',
        loading: false
      }));

      return;
    }

    try {
      const { error } = await login(email, password);
      if (error) {
        setFormData((prev) => ({
          ...prev,
          error: 'Credenciais inválidas. Por favor, tente novamente.'
        }));
      } else {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Redirecionando...',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
        router.push('/home');
      }
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        error: 'Ocorreu um erro ao tentar fazer login. Tente novamente.'
      }));
    } finally {
      setFormData((prev) => ({
        ...prev,
        loading: false
      }));
    }
  };

  const { email, password, loading, error } = formData;

  return (
    <div>
      <MainLayout>
        <div className="flex flex-col justify-around h-screen">
          <div className="flex flex-col justify-center items-center py-4">
            <Image alt="Logo" src={Logo} height={88} width={88} />
            <Text style={{ fontSize: '35px', textAlign: 'center' }}>Me passa a</Text>
            <Text style={{ fontSize: '35px', textAlign: 'center' }}>Receita aí?</Text>
          </div>
          <form onSubmit={handleSubmit}>
            <Box mb={4}>
              <TextInput
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                height="39px"
                placeholder="Insira seu e-mail..."
                required
              />
            </Box>

            <Box mt={20} mb={29}>
              <TextInput
                label="Senha"
                name="password"
                type="password"
                value={password}
                onChange={handleInputChange}
                height="39px"
                placeholder="Insira sua senha..."
                required
              />
              {error && (
                <Text className="text-error" fontSize={12} mb={4} mt={5}>
                  ❗{error}
                </Text>
              )}
            </Box>

            <div className="flex justify-center items-center flex-col py-4">
              <Button
                type="submit"
                variant="default"
                isLoading={loading}
                style={{
                  width: '100%',
                  color: 'white',
                  height: 46,
                  borderRadius: 10
                }}
                className="bg-secondary-base"
              >
                Entrar
              </Button>

              <Box mt="18px">
                <LinkButton onClick={handleRedirectToRegister}>Criar conta</LinkButton>
              </Box>
            </div>
          </form>
        </div>
      </MainLayout>
    </div>
  );
};

export default LoginPage;
