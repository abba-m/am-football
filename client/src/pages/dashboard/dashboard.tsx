import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,

  //Table
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  HStack,
} from '@chakra-ui/react';
import { PiGreaterThanBold } from 'react-icons/pi';
import { TfiLocationPin } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import LeagueMenu from '../../components/cards/leagueMenu';
import { formatDate } from '../../utils';
import { useLeagueStore } from '../../store/league';
import { FixtureAttr, StandingsAttr } from '../../interfaces';
import { pocketbase } from '../../pocketbase';
import { useEffect, useState } from 'react';

export default function Home() {
  const currentLeague = useLeagueStore((state) => state.currentLeague);
  const [standings, setStandings] = useState<StandingsAttr[]>([]);
  const [schedule, setSchedule] = useState<FixtureAttr>({});

  const fetchStandings = async () => {
    try {
      const standings = await pocketbase
        .collection<StandingsAttr>('standings')
        .getList(1, 4, {
          filter: `leagueId = "${currentLeague?.id}"`,
          sort: '-totalWins',
        });

      setStandings(standings.items);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchUpcomingMatch = async () => {
    try {
      const schedules = await pocketbase
        .collection<FixtureAttr>('fixtures')
        .getList(1, 1, {
          filter: `schedule >= "${new Date().toISOString()}" && leagueId = "${
            currentLeague?.id
          }"`,
          expand: 'leagueId,home,away',
        });

      setSchedule(schedules.items[0]);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStandings();
    fetchUpcomingMatch();
  }, [currentLeague]);

  return (
    <Container background="gray.200" maxW="1440px" minH="80dvh">
      <Box h={4}></Box>
      {/* Schedule */}
      <LeagueMenu />

      <Box my={4} mb={3}></Box>

      <Card position="relative">
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <Text fontWeight="bold" fontStyle="oblique">
              {String(schedule.stage).toUpperCase()}
            </Text>
          </Box>

          <Flex gap={6} alignItems="center">
            <VStack>
              <Avatar size="md" name={schedule?.expand?.home?.name} />
              <Text fontWeight="semibold">{schedule?.expand?.home?.name}</Text>
            </VStack>
            <VStack color="gray.500" gap={2}>
              <Heading size="sm">VS</Heading>
              <Flex direction="column" justify="center" alignItems="center">
                <Text fontWeight="semibold" fontSize="xs">
                  {formatDate(schedule.schedule)}
                </Text>
                <Text>
                  {new Date(
                    schedule?.schedule ?? new Date(),
                  ).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </Flex>
            </VStack>
            <VStack>
              <Avatar size="md" name={schedule?.expand?.away?.name} />
              <Text fontWeight="semibold">{schedule?.expand?.away?.name}</Text>
            </VStack>
          </Flex>

          <Flex gap={1}>
            <Icon as={TfiLocationPin} boxSize="6" />
            <Text fontWeight="bold">{`${schedule?.expand?.home?.stadium} Stadium`}</Text>
          </Flex>
        </Flex>
        <Box position="absolute" bottom={1} right={2} p={2}>
          <Link to="/fixtures">
            <Text fontSize="12px" decoration="underline" color="secondary">
              see all schedules...
            </Text>
          </Link>
        </Box>
      </Card>

      <Box h={4}></Box>

      {/* Table */}
      <Card>
        <CardHeader>
          <Text fontWeight="bold">Standings</Text>
          <Text fontSize="sm" color="GrayText">
            {currentLeague.title} Top 4
          </Text>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table size="sm" variant="simple">
              <TableCaption>
                <Link to="/standing">
                  <Tag
                    py={2}
                    px={4}
                    background="secondary"
                    color="whitesmoke"
                    borderRadius="24px"
                    _hover={{ cursor: 'pointer' }}
                  >
                    <HStack>
                      <Text>See full standing</Text>
                      <Icon as={PiGreaterThanBold} boxSize="4" />
                    </HStack>
                  </Tag>
                </Link>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th colSpan={10}>Team</Th>
                  <Th isNumeric>MP</Th>
                  <Th isNumeric>GS</Th>
                  <Th isNumeric>Pts</Th>
                </Tr>
              </Thead>
              <Tbody>
                {standings.length ? (
                  standings.map((standing, index) => (
                    <Tr key={standing.id}>
                      <Td>
                        <Text color="secondary">{index + 1}</Text>
                      </Td>
                      <Td colSpan={10}>{standing.teamName}</Td>
                      <Td isNumeric>{standing.matchesPlayed}</Td>
                      <Td isNumeric>{standing.totalWins}</Td>
                      <Td isNumeric>{Number(standing.totalWins) * 3}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={13}>
                      <Text>No standings yet</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      <Box h={4}></Box>
    </Container>
  );
}
