import { Box, Spinner, Text } from '@chakra-ui/react';

export const LoadingScreen = () => (
  <Box
    className="flex flex-col justify-center items-center h-screen bg-green-800"
    data-testid="loading-screen"
  >
    <Spinner height={80} width={80} color="white" data-testid="progressbar" />
    <Text mt="5rem" color="white" fontSize="xl" textAlign="center">
      Preparando os utensílios...
    </Text>
    <Text mt={2} color="white" fontSize="xl" textAlign="center">
      Sua cozinha virtual já vai abrir!
    </Text>
  </Box>
);

export default LoadingScreen;
