import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { pocketbase } from '../../pocketbase';
import PageLoader from '../../components/loader';
import { resolveFile } from '../../utils';
import { TeamAttr } from '../../interfaces';

const COL_SPAN = 3;

export default function Teams() {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState<TeamAttr[]>([]);
  const toast = useToast();

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const teams = await pocketbase.collection<TeamAttr>('team').getFullList();
      setTeams(teams);
    } catch (error: any) {
      if (error?.data?.code)
        toast({
          position: 'bottom',
          title: 'Failed to Fetch teams',
          description: error?.data?.message,
          status: 'error',
          isClosable: true,
        });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container background="gray.200" maxW="1440px" minH="80dvh">
      <Box h={4}></Box>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Teams</Text>
          {/* <Text fontSize="sm" color="GrayText">
            {schedule.title}
          </Text> */}
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table size="sm" variant="simple">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th colSpan={COL_SPAN}>Team</Th>
                  <Th>Coach</Th>
                  <Th>Stadium</Th>
                  <Th>founded</Th>
                </Tr>
              </Thead>
              <Tbody>
                {teams?.length ? (
                  teams.map((team) => (
                    <Tr key={team.id}>
                      <Td>
                        <Avatar
                          src={
                            team.logo
                              ? resolveFile({
                                  fileName: team.logo,
                                  recordId: team.id,
                                  collectionName: team.collectionName,
                                })
                              : undefined
                          }
                          name={team.name}
                          size="sm"
                        />
                      </Td>
                      <Td colSpan={COL_SPAN}>{team.name}</Td>
                      <Td>{team.coach}</Td>
                      <Td>{team.stadium}</Td>
                      <Td>
                        {new Date(team.created).toLocaleString('default', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td>
                      <Heading size="md">No teams found</Heading>
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
