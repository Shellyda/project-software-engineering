import { Box, Text, VStack } from '@chakra-ui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { ErrorIcon } from '@/styles/customIcons';

const ErrorScreen = () => {
  return (
    <Box
      bg="beige"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      data-testid="error-container"
    >
      <VStack spacing={5} gap={16}>
        <ErrorIcon height={140} width={140} />
        <Text fontSize="48px" fontWeight="bold" color="black">
          Ops!
        </Text>
        <Text fontSize="md" textAlign="center" color="black" width={300}>
          Parece que algo deu errado no seu caminho para a cozinha...
          <br />
          Tente novamente!
        </Text>
        <ArrowPathIcon height={48} width={48} />
      </VStack>
    </Box>
  );
};

export default ErrorScreen;
