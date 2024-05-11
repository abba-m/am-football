import {
  Box,
  Flex,
  VStack,
  Avatar,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';
import { TfiLocationPin } from 'react-icons/tfi';
import { FixtureAttr } from '../../interfaces';
import { formatDate, resolveFile } from '../../utils';

interface FixtureCardProp {
  fixture: FixtureAttr;
}

export default function FixtureCard({ fixture }: FixtureCardProp) {
  const { expand, schedule, stage } = fixture;
  const home = expand?.home;
  const away = expand?.away;

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" p={4}>
        <Box>
          <Text fontWeight="bold" fontStyle="oblique">
            {String(stage).toUpperCase()}
          </Text>
        </Box>

        <Flex gap={6} alignItems="center">
          <VStack>
            <Avatar
              size="md"
              src={
                home?.logo
                  ? resolveFile({
                      fileName: home?.logo as string,
                      collectionName: 'team',
                      recordId: home?.id as string,
                    })
                  : undefined
              }
              name={home?.name}
            />
            <Text fontWeight="semibold">{home?.name}</Text>
          </VStack>
          <VStack color="gray.500" gap={2}>
            <Heading size="sm">VS</Heading>
            <Flex direction="column" justify="center" alignItems="center">
              <Text fontWeight="semibold" fontSize="xs">
                {formatDate(schedule)}
              </Text>
              <Text>
                {new Date(schedule || new Date()).toLocaleTimeString(
                  [],
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}
              </Text>
            </Flex>
          </VStack>
          <VStack>
            <Avatar
              size="md"
              src={
                away?.logo
                  ? resolveFile({
                      fileName: away?.logo as string,
                      collectionName: 'team',
                      recordId: away?.id as string,
                    })
                  : undefined
              }
              name={away?.name}
            />
            <Text fontWeight="semibold">{away?.name}</Text>
          </VStack>
        </Flex>

        <Flex gap={1}>
          <Icon as={TfiLocationPin} boxSize="6" />
          <Text fontWeight="bold">{`${home?.stadium} Stadium`}</Text>
        </Flex>
      </Flex>
    </>
  );
}
