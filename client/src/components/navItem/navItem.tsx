import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NavItem({ to, name }: Record<'name' | 'to', string>) {
  return (
    <Link to={to}>
      <Flex
        justifyContent="center"
        alignItems="center"
        borderRadius="xl"
        py={2}
        px={3}
        _hover={{
          bg: 'secondary',
          transition: 'ease-in 0.2s'
        }}
        // h="xl"
      >
        <Text color="whitesmoke">
          {name}
        </Text>
      </Flex>
    </Link>
  );
}
