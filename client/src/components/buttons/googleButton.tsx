import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      w="100%"
      mb={4}
      onClick={onClick}
      variant="outline"
      color="blackAlpha.900"
    >
      <FcGoogle size="1.8rem" style={{ marginRight: '1.5rem' }} />
      With Google
    </Button>
  );
}
