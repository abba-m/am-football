import { Box, Icon, Divider, Text, HStack } from '@chakra-ui/react';
import { BiPowerOff } from 'react-icons/bi';
import { FaFootballBall, FaUsers } from 'react-icons/fa';
import { GrSchedule } from 'react-icons/gr';
import { TfiCup } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { useAdminStore } from '../../store/admin.store';

const adminRoutes = [
  {
    name: 'Manage leagues',
    to: '/admin-leagues',
    icon: TfiCup,
  },
  {
    name: 'Manage teams',
    to: '/admin-teams',
    icon: FaFootballBall,
  },
  {
    name: 'Manage fixtures',
    to: '/admin-fixtures',
    icon: GrSchedule,
  },
  {
    name: 'Manage users',
    to: '/admin-users',
    icon: FaUsers,
  },
];

export default function AdminDrawer() {
  const { clearAdmin } = useAdminStore();
  
  const handleLogout = () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    
    clearAdmin();
  };

  return (
    <Box bgColor="whitesmoke" w="fit-content" p={4} mr={2}>
      <Link to="/admin-home">
        <Text fontSize="20px">Welcome Admin</Text>
      </Link>
      <Divider my={6} />

      {adminRoutes.map((route, index) => (
        <Link key={index} to={route.to}>
          <HStack
            _hover={{
              backgroundColor: 'secondary',
              color: 'whitesmoke',
              borderRadius: 'md',
              cursor: 'pointer',
            }}
            p={2}
            borderRadius="md"
          >
            <Icon as={route.icon} />
            <Text>{route.name}</Text>
          </HStack>
          <Divider my={4} />
        </Link>
      ))}

      <HStack
        _hover={{
          backgroundColor: 'secondary',
          color: 'whitesmoke',
          borderRadius: 'md',
          cursor: 'pointer',
        }}
        p={2}
        borderRadius="md"
        onClick={handleLogout}
      >
        <Icon as={BiPowerOff} />
        <Text>Logout</Text>
      </HStack>
    </Box>
  );
}
