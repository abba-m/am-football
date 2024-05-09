import { Box, Icon, Heading, Link, Stack } from '@chakra-ui/react';
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoYoutube,
} from 'react-icons/io5';

export default function Footer() {
  return (
    <Box w="100%" bg="primary" h="80px" position="fixed" py="10px" bottom="0">
      <Box
        display="flex"
        mx="auto"
        maxW="container.lg"
        justifyContent="center"
        alignItems="center"
        color={'white'}
      >
        <Stack direction="column" alignItems="center">
          <Heading as={'h5'} size="md">
            ©{new Date().getFullYear()} AM Sporting, Inc.
          </Heading>
          <Stack direction="row" spacing="1.8rem">
            <Link
              _hover={{ pointer: 'cursor', color: 'secondary' }}
              target="blank"
              href="https://www.instagram.com/abba_m_"
            >
              <Icon as={IoLogoInstagram} boxSize="6" />
            </Link>
            <Link
              _hover={{ pointer: 'cursor', color: 'secondary' }}
              target="blank"
              href="https://www.facebook.com/"
            >
              <Icon as={IoLogoFacebook} boxSize="6" />
            </Link>
            <Link
              _hover={{ pointer: 'cursor', color: 'secondary' }}
              target="blank"
              href="https://www.youtube.com/channel/UCAowbJINSLm_XOhv4NzzTfQ"
            >
              <Icon as={IoLogoYoutube} boxSize="6" />
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
