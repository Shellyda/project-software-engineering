'use client';

import { useAuth } from '@/hooks/useAuth';
import { Box, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { LogoIcon } from '@/styles/customIcons';

import LinkButton from '@/components/atoms/LinkButton';
import TextInput from '@/components/atoms/TextInput';
import ErrorScreen from '@/components/templates/ErrorScreen/ErrorScreen';
import { LoadingScreen } from '@/components/templates/LoadingScreen';
import { MainLayout } from '@/components/templates/MainLayout';

import validateEmail from '@/lib/utils/forms/validateEmail';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loading: false,
    error: null as string | null,
    isEmailValid: true
  });
  const [showWarningTemplates, setShowWarningTemplates] = useState({ success: false, fail: false });
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      isEmailValid: name === 'email' ? validateEmail(value) : prev.isEmailValid
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
        setShowWarningTemplates((prev) => ({
          ...prev,
          success: true
        }));

        setTimeout(() => {
          router.push('/home');
        }, 3000);
      }
    } catch (err) {
      setShowWarningTemplates((prev) => ({
        ...prev,
        success: true
      }));
    } finally {
      setFormData((prev) => ({
        ...prev,
        loading: false
      }));
    }
  };

  const { email, password, loading, error, isEmailValid } = formData;

  if (showWarningTemplates.success) {
    return <LoadingScreen />;
  } else if (showWarningTemplates.fail) {
    return <ErrorScreen />;
  }

  return (
    <div>
      <MainLayout>
        <div className="flex flex-col justify-around h-screen">
          <div className="flex flex-col justify-center items-center py-4">
            <LogoIcon height={88} width={88} />
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
              {!isEmailValid && (
                <Text color="red" fontSize={12} mt={4}>
                  ❗ Forneça um e-mail válido.
                </Text>
              )}
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
                  ❗ {error}
                </Text>
              )}
            </Box>

            <div className="flex justify-center items-center flex-col py-4">
              <Button
                type="submit"
                variant="default"
                isLoading={loading}
                isDisabled={!(email && password && !error && isEmailValid)}
                style={{
                  width: '100%',
                  color: 'white',
                  height: 46,
                  borderRadius: 10
                }}
                _disabled={{ opacity: 0.5 }}
                className="bg-secondary-base"
              >
                Entrar
              </Button>

              <Box mt="4rem">
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
