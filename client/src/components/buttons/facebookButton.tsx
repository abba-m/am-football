import { Button } from '@chakra-ui/react';
import { RiFacebookFill } from 'react-icons/ri';

export default function FacebookButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      w="100%"
      mb={4}
      variant="solid"
      onClick={onClick}
      colorScheme="facebook"
    >
      <RiFacebookFill size="1.8rem" style={{ marginRight: '1.5rem' }} />
      With Facebook
    </Button>
  );
}
