import {
  Avatar,
  Box,
  BoxProps,
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
  SimpleGrid,
} from '@chakra-ui/react';
import { TfiLocationPin } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import LeagueMenu from '../../components/cards/leagueMenu';
import { formatDate } from '../../utils';
import { useLeagueStore } from '../../store/league';
import { FixtureAttr, StandingsAttr } from '../../interfaces';
import { pocketbase } from '../../pocketbase';
import { useEffect, useState } from 'react';
import StatCard from '../../components/cards/stat';
import { SettingsIcon } from '@chakra-ui/icons';
import AdminDrawer from './drawer.admin';

const stats = [
  { label: 'Teams', value: '71' },
  { label: 'Leagues', value: '56' },
  { label: 'Users', value: '12' },
];

const Gap = ({ ...props }: BoxProps) => <Box h={4} {...props} />;

export default function AdminHome() {
  const currentLeague = useLeagueStore((state) => state.currentLeague);
  const [standings, setStandings] = useState<StandingsAttr[]>([]);
  const [schedule, setSchedule] = useState<FixtureAttr>({});
  const [stats, setStats] = useState<
    { label: string; value: string; to: string; tip: string }[]
  >([
    { label: 'Teams', value: '0', to: '', tip: '' },
    { label: 'Leagues', value: '0', to: '', tip: '' },
    { label: 'Users', value: '0', to: '', tip: '' },
  ]);

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

  const fetchStats = async () => {
    try {
      const teams = await pocketbase.collection('team').getList(1, 1);

      const leagues = await pocketbase.collection('league').getList(1, 1);
      const users = await pocketbase.collection('users').getList(1, 1);

      setStats([
        {
          label: 'Teams',
          value: teams.totalItems.toString(),
          to: '/admin-leagues',
          tip: 'Manage teams',
        },
        {
          label: 'Leagues',
          value: leagues.totalItems.toString(),
          to: '/admin-leagues',
          tip: 'Manage leagues',
        },
        {
          label: 'Users',
          value: users.totalItems.toString(),
          to: '/admin-users',
          tip: 'Manage users',
        },
      ]);
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
    fetchStats();
  }, []);

  useEffect(() => {
    fetchStandings();
    fetchUpcomingMatch();
  }, [currentLeague]);

  return (
    <Box flex={1}>
      <Box>
      {/* Schedule */}
      <LeagueMenu />

      <Gap mb={3} />

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
        {stats.map((props) => (
          <StatCard key={props.label} {...props} />
        ))}
      </SimpleGrid>

      <Gap />

      <Card position="relative">
        <Flex justifyContent="space-between" alignItems="center" p={4}>
          <Box>
            <Text fontWeight="bold" fontStyle="oblique">
              {String(schedule?.stage).toUpperCase()}
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
                  {formatDate(schedule?.schedule)}
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
            {currentLeague?.title} Top 4
          </Text>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table size="sm" variant="simple">
              <TableCaption>
                <Link to="/admin-fixtures">
                  <Tag
                    py={2}
                    px={4}
                    background="secondary"
                    color="whitesmoke"
                    borderRadius="24px"
                    _hover={{ cursor: 'pointer' }}
                  >
                    <HStack>
                      <Text>Manage results</Text>
                      <SettingsIcon boxSize="4" />
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
                {standings?.length ? (
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
                      <Text>{`No standings for "${currentLeague?.title}" yet`}</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      </Box>
    </Box>
  );
}
