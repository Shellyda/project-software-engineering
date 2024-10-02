import { Box, Text, VStack } from '@chakra-ui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { ErrorIcon } from '@/styles/customIcons';

interface ErrorScreenProps {
  onClick: () => void;
}

const ErrorScreen = ({ onClick }: ErrorScreenProps) => {
  return (
    <Box
      bg="beige"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      data-testid="error-screen"
    >
      <VStack spacing={5} gap={16} data-testid="error-container">
        <ErrorIcon height={140} width={140} />
        <Text fontSize="48px" fontWeight="bold" color="black">
          Ops!
        </Text>
        <Text fontSize="md" textAlign="center" color="black" width={300}>
          Parece que algo deu errado no seu caminho para a cozinha...
          <br />
          Tente novamente!
        </Text>
        <ArrowPathIcon height={48} width={48} onClick={onClick} />
      </VStack>
    </Box>
  );
};

export default ErrorScreen;
