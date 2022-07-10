import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { ServiceLayout } from '@/components/service_layout';
// import { UserInfo } from 'fiebase-admin/lib/auth/user-record';

const userInfo = {
  uid: 'test',
  email: 'thd0563@gmail.com',
  displayName: 'younhee',
  photoURL: 'https://lh3.googleusercontent.com/a/AATXAJwMZHJHS_lptPJ-T3camKP4cotf4pa6jgE5CBDW=s96-c',
};

const UserHomePage: NextPage = function () {
  return (
    <ServiceLayout title="user home" minH="100vh" backgroundColor="gray.200">
      <Box maxW="md" mx="auto" pt="6">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex p="6">
            <Avatar size="lg" src={userInfo.photoURL} mr="2" />
            <Flex direction="column" justify="center">
              <Text fontSize="md">{userInfo.displayName}</Text>
              <Text fontSize="md">{userInfo.email}</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default UserHomePage;
