import { NextPage } from 'next';
import { Box, Flex, Heading, Center } from '@chakra-ui/react';
import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_button';
import { useAuth } from '@/contexts/auth_user_context';

const IndexPage: NextPage = function () {
  const { signInWithGoogle } = useAuth();
  return (
    <ServiceLayout title="test" minH="100vh" backgroundColor="gray.50">
      <Box maxW="md" mx="auto" mt="10">
        <img src="/main_logo.svg" alt="logo" />
        <Flex justify="center">
          <Heading>#next-typescript</Heading>
        </Flex>
      </Box>
      <Center mt="20">
        <GoogleLoginButton onClick={signInWithGoogle} />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
