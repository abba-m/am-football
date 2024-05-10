import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import NavItem from '../navItem/navItem';
import Login from '../auth/login';
import Register from '../auth/register';

const routes = [
  {
    to: '/standing',
    name: 'Standings',
  },
  {
    to: '/fixtures',
    name: 'Fixtures',
  },
  {
    to: '/results',
    name: 'Results',
  },
  {
    to: '/teams',
    name: 'Teams',
  },
];

const LoginButton = ({ openLogin }: Record<'openLogin', () => void>) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      borderRadius="xl"
      py={2}
      px={6}
      bg="secondary"
      onClick={openLogin}
      _hover={{
        transition: 'ease-in 0.3s',
        bg: 'teal.600',
      }}
    >
      <Text color="whitesmoke">Login</Text>
    </Flex>
  );
};

export default function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Dan Abramov',
    avatar: 'https://bit.ly/dan-abramov',
  });

  const {
    isOpen: isLoginOpen,
    onOpen: openLogin,
    onClose: closeLogin,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: openRegister,
    onClose: closeRegister,
  } = useDisclosure();

  return (
    <Grid
      templateColumns="1fr 2fr 1fr"
      bg="primary"
      w="100vw"
      h="70px"
      px="1rem"
    >
      <Flex justifyContent="flex-start" alignItems="center">
        <Link to="/">
          <Heading as="h4" size={'md'} color="whitesmoke">
            AM Sporting
          </Heading>
        </Link>
      </Flex>
      <Flex justifyContent="center" gap={4} alignItems="center">
        {routes.map((route) => (
          <NavItem {...route} key={route.to} />
        ))}
      </Flex>
      <Flex justifyContent="flex-end" alignItems="center">
        <Box pr="4rem">
          {isAuthenticated ? (
            <Link to="/profile">
              <Avatar name={currentUser.name} src={currentUser.avatar} />
            </Link>
          ) : (
            <LoginButton openLogin={openLogin} />
          )}
        </Box>
      </Flex>
      <Login
        isOpen={isLoginOpen}
        onClose={closeLogin}
        openRegister={openRegister}
      />
      <Register
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        openLogin={openLogin}
      />
    </Grid>
  );
}
