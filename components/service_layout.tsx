/* eslint-disable react/jsx-props-no-spreading */
import { Box, BoxProps } from '@chakra-ui/react';
import Head from 'next/head';
import GNB from './GNB';

interface Props {
  title: string;
  children: React.ReactNode;
}
export const ServiceLayout: React.FC<Props & BoxProps> = function ({
  title = 'next-ts',
  children,
  ...boxProps
}: Props) {
  return (
    <Box {...boxProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <GNB />
      {children}
    </Box>
  );
};
