import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import NavItem from '../navItem/navItem';
import Login from '../auth/login';
import Register from '../auth/register';
import { UserAttr, useCurrentUserStore } from '../../store/auth';
import { FiSettings } from 'react-icons/fi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useAdminStore } from '../../store/admin.store';

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

const ProfileMenu = ({
  currentUser,
  logout,
}: {
  currentUser: UserAttr;
  logout: () => void;
}) => (
  <Menu>
    <MenuButton>
      <Avatar
        name={currentUser?.name || 'New User'}
        src={currentUser.avatar || 'https://bit.ly/dan-abramov'}
      />
    </MenuButton>
    <MenuList>
      <MenuItem>
        <Heading as="h5" size="sm">
          {currentUser?.name}
        </Heading>
      </MenuItem>
      <MenuDivider />

      <MenuItem>
        <FiSettings style={{ marginRight: '.7rem' }} /> Settings
      </MenuItem>
      <MenuDivider />
      <MenuItem color="red.500" onClick={logout}>
        <AiOutlinePoweroff style={{ marginRight: '.7rem' }} /> Log out
      </MenuItem>
    </MenuList>
  </Menu>
);

export default function Nav() {
  const { user: currentUser, clearUser: logout } = useCurrentUserStore();
  const { isAuthenticated: isAdmin, admin } = useAdminStore();
  const isAuthenticated = !!currentUser?.id;

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
    <Flex
      bg="primary"
      minH="70px"
      px={{ base: '15px', md: '1rem' }}
      role="navigation"
    >
      <Flex justifyContent="flex-start" alignItems="center" flex="1">
        <Link to="/">
          <Heading as="h4" size={'md'} color="whitesmoke">
            AM Sporting
          </Heading>
        </Link>
      </Flex>
      <Flex flex="2" justifyContent="center" gap={4} alignItems="center">
        {routes.map((route) => (
          <NavItem {...route} key={route.to} />
        ))}
      </Flex>
      <Flex flex="1" justifyContent="flex-end" alignItems="center">
        {isAdmin ? (
          <Box pr={{ base: '1rem', md: '4rem' }}>
            <Link to="/admin-home">
              <Text color="whitesmoke">{'Admin ' + admin?.email?.split('@')[0]}</Text>
            </Link>
          </Box>
        ) : (
          <Box pr={{ base: '1rem', md: '4rem' }}>
            {isAuthenticated ? (
              <ProfileMenu currentUser={currentUser} logout={logout} />
            ) : (
              <LoginButton openLogin={openLogin} />
            )}
          </Box>
        )}
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
    </Flex>
  );
}
