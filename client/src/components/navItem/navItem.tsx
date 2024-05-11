import { Flex, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { SECONDARY } from '../../theme';
import { useMemo } from 'react';

export default function NavItem({ to, name }: Record<'name' | 'to', string>) {
  // Inside your component
  const location = useLocation();
  const isActive = useMemo(
    () => location.pathname.includes(to),
    [location.pathname],
  );

  return (
    <Link to={to}>
      <Flex
        justifyContent="center"
        alignItems="center"
        borderRadius="xl"
        position={'relative'}
        _after={
          isActive
            ? {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '2px',
                background: SECONDARY,
                transition: 'ease-in 0.3s',
              }
            : {}
        }
        py={2}
        px={3}
        _hover={{
          bg: 'secondary',
          transition: 'ease-in 0.2s',
        }}
        // h="xl"
      >
        <Text color="whitesmoke">{name}</Text>
      </Flex>
    </Link>
  );
}
