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

const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    error: null as string | null,
    isEmailValid: true
  });
  const [showWarningTemplates, setShowWarningTemplates] = useState({ success: false, fail: false });
  const [showPasswordsMatchingError, setPasswordMatchingError] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
    passwordsMatch: false
  });

  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      isEmailValid: name === 'email' ? validateEmail(value) : prev.isEmailValid,
      error: null
    }));

    if (name === 'password' || name === 'confirmPassword') {
      checkPasswordRequirements(
        name === 'password' ? value : formData.password,
        name === 'confirmPassword' ? value : formData.confirmPassword
      );
    }
  };

  const checkPasswordRequirements = (password: string, confirmPassword: string) => {
    const passwordsMatch = password === confirmPassword;
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@#$%^&*!]/.test(password),
      passwordsMatch
    });

    setPasswordMatchingError(!passwordsMatch);
  };

  const allRequirementsMet =
    Object.values(passwordRequirements).every(Boolean) && formData.isEmailValid;

  const handleRedirectToLogin = () => {
    router.push('/login');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await signUp(formData.email, formData.password);
      if (error) {
        let errorMessage;

        switch (error.code) {
          case 'email_address_not_authorized':
            errorMessage = 'Forneça um e-mail real.';
            break;
          case 'user_already_exists':
            errorMessage = 'Usuário já cadastrado!';
            break;
          default:
            errorMessage = 'Algo deu errado... Por favor, tente novamente em alguns minutos.';
            break;
        }

        setFormData((prev) => ({
          ...prev,
          error: errorMessage
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

  const { email, password, confirmPassword, loading, error, isEmailValid } = formData;

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
            <Text style={{ fontSize: '35px', textAlign: 'center' }}>Vamos começar</Text>
            <Text style={{ fontSize: '35px', textAlign: 'center' }}>com o básico...</Text>
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

            <Box mt={20} mb={4}>
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
            </Box>

            <Box mt={10} fontSize={12}>
              <Text color={passwordRequirements.length ? 'green' : 'black'}>
                - 🧂 8 caracteres ou mais
              </Text>
              <Text color={passwordRequirements.uppercase ? 'green' : 'black'}>
                - 🥚 1 letra maiúscula
              </Text>
              <Text color={passwordRequirements.number ? 'green' : 'black'}>- 🍫 1 número</Text>
              <Text color={passwordRequirements.specialChar ? 'green' : 'black'}>
                - 🌶️ 1 caractere especial (para aquele tempero extra, como @, #, $)
              </Text>
            </Box>

            <Box mt={20} mb={29}>
              <TextInput
                label="Confirmar Senha"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleInputChange}
                height="39px"
                placeholder="Confirme sua senha..."
                required
              />
              {showPasswordsMatchingError && (
                <Text className="text-error" fontSize={12} mb={4} mt={5}>
                  ❗ Senhas não conferem.
                </Text>
              )}
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
                isDisabled={!(allRequirementsMet && !error)}
                style={{
                  width: '100%',
                  color: 'white',
                  height: 46,
                  borderRadius: 10
                }}
                _disabled={{ opacity: 0.5 }}
                className="bg-secondary-base"
              >
                Criar conta
              </Button>

              <Box mt="4rem">
                <LinkButton onClick={handleRedirectToLogin}>Fazer Login</LinkButton>
              </Box>
            </div>
          </form>
        </div>
      </MainLayout>
    </div>
  );
};

export default SignUpPage;
