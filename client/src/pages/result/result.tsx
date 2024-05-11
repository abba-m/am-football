import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  HStack,
  Heading,
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
import { pocketbase } from '../../pocketbase';
import { MatchResultAttr } from '../../interfaces';
import { useEffect, useState } from 'react';
import { resolveFile } from '../../utils';

const COL_SPAN = 2;

export default function Result() {
  const currentLeague = useLeagueStore((state) => state.currentLeague);
  const [results, setResults] = useState<MatchResultAttr[]>([]);

  const fetchResults = async () => {
    try {
      const results = await pocketbase
        .collection<MatchResultAttr>('result')
        .getFullList({
          sort: '-created',
          expand: 'fixtureId,fixtureId.home,fixtureId.away',
        });
      setResults(results);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [currentLeague]);

  const formatDate = (date?: string) => {
    const dateObj = date ? new Date(date) : new Date();
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()} ${dateObj.getHours()}:${
      dateObj.getMinutes() < 10 ? '0' : ''
    }${dateObj.getMinutes()}`;
  };

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
                  <Th>Date</Th>
                  <Th colSpan={COL_SPAN}>Home</Th>
                  <Th isNumeric>score</Th>
                  <Th>#</Th>
                  <Th>score</Th>
                  <Th colSpan={COL_SPAN}>Away</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results?.length ? (
                  results
                    .filter(
                      (f) => f.expand?.fixtureId?.leagueId != currentLeague?.id,
                    )
                    .map(({ id, home, away, expand }) => (
                      <Tr key={id}>
                        <Td>{formatDate(expand?.fixtureId?.schedule)}</Td>
                        <Td colSpan={COL_SPAN}>
                          <HStack>
                            <Avatar
                              size="sm"
                              src={resolveFile({
                                fileName: expand?.fixtureId?.expand?.home
                                  ?.logo as string,
                                collectionName: 'team',
                                recordId: expand?.fixtureId?.expand?.home
                                  ?.id as string,
                              })}
                              name={expand?.fixtureId?.expand?.home?.name}
                            />
                            <Text>{expand?.fixtureId?.expand?.home?.name}</Text>
                          </HStack>
                        </Td>
                        <Td isNumeric>{home}</Td>
                        <Td>
                          <Text fontWeight="bold">vs</Text>
                        </Td>
                        <Td>{away}</Td>
                        <Td colSpan={COL_SPAN}>
                          <HStack>
                            <Avatar
                              size="sm"
                              src={resolveFile({
                                fileName: expand?.fixtureId?.expand?.away
                                  ?.logo as string,
                                collectionName: 'team',
                                recordId: expand?.fixtureId?.expand?.away
                                  ?.id as string,
                              })}
                              name={expand?.fixtureId?.expand?.away?.name}
                            />
                            <Text>{expand?.fixtureId?.expand?.away?.name}</Text>
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                ) : (
                  <Heading>No results for {currentLeague.title} yet</Heading>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Container>
  );
}
