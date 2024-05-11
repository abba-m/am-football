import { Container, Flex, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
      <Container maxW="1440px" minH="80dvh">
        <Flex minH="80dvh" w="100vw" alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="secondary"
            size="xl"
          />
        </Flex>
      </Container>
    );
}
