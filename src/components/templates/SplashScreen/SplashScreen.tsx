import { Center, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MotionDiv = motion.div;

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <Center
        height="100vh"
        className="bg-primary"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <MotionDiv
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <motion.img
            src="/Logo.svg"
            alt="Icon"
            style={{ width: '88px', height: '88px', position: 'relative', top: '17px' }}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <Text fontSize="35px" fontWeight="bold" color="black" margin="20px">
            Me passa a <br /> Receita aí?
          </Text>
        </MotionDiv>
      </Center>
    );
  }

  return null;
};

export default SplashScreen;
