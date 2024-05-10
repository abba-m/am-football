import { Box, Button, Text, Image, Center, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/images/404-removebg.png';

export default function NotFound() {
  return (
    <Box
      justifyContent="center"
      display="flex"
      flexDirection="column"
      w="100vw"
    >
      <Center>
        <Text fontFamily='monospace' fontSize="5xl" mb="-20px">
          Page not found
        </Text>
      </Center>
      <Flex justifyContent="center" width="100vw">
        <Image src={notFoundImage} width="500px" alt="404" />
      </Flex>

      <Link to="/">
        <Center>
          <Button variant="outline">Goto Home</Button>
        </Center>
      </Link>
    </Box>
  );
}
