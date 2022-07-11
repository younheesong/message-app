import { Avatar, Box, Button, Flex, FormControl, FormLabel, Text, Textarea, useToast, Switch } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import ResizeTextArea from 'react-textarea-autosize';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ServiceLayout } from '@/components/service_layout';
import { useAuth } from '@/contexts/auth_user_context';
import { InAuthUser } from '@/models/in_auth_user';

// const userInfo = {
//   uid: 'test',
//   email: 'thd0563@gmail.com',
//   displayName: 'younhee',
//   photoURL: 'https://lh3.googleusercontent.com/a/AATXAJwMZHJHS_lptPJ-T3camKP4cotf4pa6jgE5CBDW=s96-c',
// };
interface Props {
  userInfo: InAuthUser | null;
}
const UserHomePage: NextPage<Props> = function ({ userInfo }) {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const toast = useToast();
  const { authUser } = useAuth();
  if (userInfo === null) {
    return <p>사용자를 찾을 수 없습니다.</p>;
  }
  return (
    <ServiceLayout title="user home" minH="100vh" backgroundColor="gray.200">
      <Box maxW="md" mx="auto" pt="6">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex p="6">
            <Avatar size="lg" src={userInfo.photoURL ?? 'https://bit.ly/broken-link'} mr="2" />
            <Flex direction="column" justify="center">
              <Text fontSize="md">{userInfo.displayName}</Text>
              <Text fontSize="md">{userInfo.email}</Text>
            </Flex>
          </Flex>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex align="center" p="2">
            <Avatar
              size="xs"
              mr="2"
              src={isAnonymous ? 'https://bit.ly/broken-link' : authUser?.photoURL ?? 'https://bit.ly/broken-link'}
            />
            <Textarea
              bg="gray.100"
              border="none"
              placeholder="무엇이 궁금한가요?"
              resize="none"
              minH="unset"
              overflow="hidden"
              fontSize="xs"
              mr="2"
              as={ResizeTextArea}
              maxRows={7}
              value={message}
              onChange={(e) => {
                if (e.currentTarget.value) {
                  const lineCount = (e.currentTarget.value.match(/[^\n]*\n]*/gi)?.length ?? 1) + 1;
                  if (lineCount > 7) {
                    toast({
                      title: '최대 7줄까지 입력 가능합니다.',
                      position: 'top-right',
                    });
                    return;
                  }
                }
                setMessage(e.currentTarget.value);
              }}
            />
            <Button disabled={message.length === 0} bgColor="#ff886c" color="white" colorScheme="yellow" size="sm">
              등록
            </Button>
          </Flex>
          <FormControl display="flex" mx="2" alignItems="center" mt="1" pb="2">
            <Switch
              size="sm"
              colorScheme="orange"
              id="anonymous"
              mr="1"
              isChecked={isAnonymous}
              onChange={() => {
                if (authUser === null) {
                  toast({ title: '로그인이 필요합니다.', position: 'top-right' });
                  return;
                }
                setIsAnonymous((prev) => !prev);
              }}
            />
            <FormLabel htmlFor="anonymous" mb="0" fontSize="xx-small">
              {' '}
              anonymous
            </FormLabel>
          </FormControl>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { screenName } = query;
  if (screenName === undefined) {
    return {
      props: {
        userInfo: null,
      },
    };
  }
  try {
    const protocol = process.env.PROTOCOL || 'http';
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || '3000';

    const baseUrl = `${protocol}://${host}:${port}`;
    const userInfoResp: AxiosResponse<InAuthUser> = await axios(`${baseUrl}/api/user.info/${screenName}`);
    console.log(userInfoResp.data);
    return {
      props: {
        userInfo: userInfoResp.data ?? null,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        userInfo: null,
      },
    };
  }
};

export default UserHomePage;
