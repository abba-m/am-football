import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useLeagueStore } from '../../store/league';
import { StandingsAttr } from '../../interfaces';
import { pocketbase } from '../../pocketbase';
import { useEffect, useState } from 'react';

const COL_SPAN = 6;

export default function Standing() {
  const currentLeague = useLeagueStore((state) => state.currentLeague);
  const [standings, setStandings] = useState<StandingsAttr[]>([]);

  const fetchStandings = async () => {
    try {
      const standings = await pocketbase
        .collection<StandingsAttr>('standings')
        .getFullList({
          filter: `leagueId = "${currentLeague.id}"`,
          sort: '-totalWins',
        });

      setStandings(standings);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStandings();
  }, [currentLeague])

  return (
    <Container background="gray.200" maxW="1440px" minH="80dvh">
      <Box h={4}></Box>

      {/* Table */}
      <Card>
        <CardHeader>
          <Text fontWeight="bold">Standings</Text>
          <Text fontSize="sm" color="GrayText">
            {currentLeague.title}
          </Text>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table size="sm" variant="simple">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th colSpan={COL_SPAN}>Team</Th>
                  <Th isNumeric>MP</Th>
                  <Th isNumeric>GS</Th>
                  <Th isNumeric>Pts</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  standings.map((standing, index) => (
                    <Tr key={standing.id}>
                      <Td><Text color="secondary">{index + 1}</Text></Td>
                      <Td colSpan={COL_SPAN}>{standing.teamName}</Td>
                      <Td isNumeric>{standing.matchesPlayed}</Td>
                      <Td isNumeric>{standing.totalWins}</Td>
                      <Td isNumeric>{Number(standing.totalWins) * 3}</Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Container>
  );
}
