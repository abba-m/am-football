import {
  AddIcon,
  CheckCircleIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { TeamAttr } from '../../interfaces';
import { useEffect, useState } from 'react';
import { pocketbase } from '../../pocketbase';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { resolveFile } from '../../utils';

const COL_SPAN = 2;

export default function AdminTeams() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState<TeamAttr[]>([]);

  const [editTeamMode, setTeamMode] = useState(false);
  const [editTeamId, setEditTeamId] = useState<string | null>(null);

  const toast = useToast();
  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const fetchTeams = async () => {
    try {
      if (page < 1 || page > total) return;

      const teams = await pocketbase
        .collection<TeamAttr>('team')
        .getList(page, 10, {
          sort: '-created',
          requestKey: null,
        });

      setTotal(teams.totalPages);
      setTeams((prev) => _.uniqBy([...prev, ...teams.items], 'id'));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCreateTeam = async (data: Record<string, string>) => {
    setLoading(true);
    try {
      if (editTeamMode) {
        console.log('edit', data);

        pocketbase
          .collection<TeamAttr>('team')
          .update(editTeamId as string, data)
          .then(() => {
            setTeamMode(false);
            setEditTeamId(null);

            setTeams((prev) => {
              prev = prev.map((team) => {
                if (team.id === editTeamId) {
                  return { ...team, ...data };
                }
                return team;
              });

              return [...prev];
            });

            toast({
              title: 'Team updated',
              description: 'team has been updated successfully',
              status: 'success',
              isClosable: true,
            });
            reset();
          })
          .catch((error: any) => {
            if (error?.data?.code)
              toast({
                title: 'Failed to delete',
                description: error.data.message,
                status: 'error',
                isClosable: true,
              });
          })
          .finally(() => setLoading(false));

        return;
      }

      const team = await pocketbase
        .collection<TeamAttr>('team')
        .create(data);

      setTeams((prev) => [team, ...prev]);

      toast({
        title: 'League created',
        description: 'League has been created successfully',
        status: 'success',
        isClosable: true,
      });

      reset();
    } catch (error: any) {
      if (error?.data?.code)
        toast({
          title: 'Failed to login',
          description: error.data.message,
          status: 'error',
          isClosable: true,
        });
    } finally {
      setLoading(false);
    }
  };

  const handleEditTeam = (team: TeamAttr) => {
    setTeamMode(true);
    setEditTeamId(team.id as string);
    setValue('name', team.name);
    setValue('coach', team.coach);
    setValue('stadium', team.stadium);
  };

  const handleDeleteTeam = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"`)) return;

    setLoading(true);
    pocketbase
      .collection<TeamAttr>('team')
      .delete(id)
      .then(() => {
        setTeams((prev) => prev.filter((team) => team.id !== id));
        toast({
          title: 'Team deleted',
          description: 'team has been deleted successfully',
          status: 'success',
          isClosable: true,
        });
      })
      .catch((error: any) => {
        if (error?.data?.code)
          toast({
            title: 'Failed to delete',
            description: error.data.message,
            status: 'error',
            isClosable: true,
          });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const increasePage = () => page > 1 && setPage((prev) => prev + 1);
  const decreasePage = () => page < total && setPage((prev) => prev - 1);

  return (
    <Box flex={1} p={4}>
      {/* Form */}
      <Card my={4} p={4}>
        <form onSubmit={handleSubmit(handleCreateTeam)}>
          <HStack>
            <FormControl isInvalid={!!errors.name}>
              <Input
                type="text"
                w="100%"
                {...register('name', {
                  required: 'Team name is required',
                })}
                bg="#FAF3F391"
                placeholder="Team name"
              />

              <FormErrorMessage>
                {errors.name && String(errors.name.message)}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.coach}>
              <Input
                type="text"
                w="100%"
                {...register('coach', {
                  required: 'Coach name is required'
                })}
                bg="#FAF3F391"
                placeholder="Coach name"
              />

              <FormErrorMessage>
                {errors.coach && String(errors.coach.message)}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.stadium}>
              <Input
                type="text"
                w="100%"
                {...register('stadium', {
                  required: 'Stadium name is required'
                })}
                bg="#FAF3F391"
                placeholder="Stadium name"
              />

              <FormErrorMessage>
                {errors.stadium && String(errors.stadium.message)}
              </FormErrorMessage>
            </FormControl>

            {editTeamMode && (
              <Button
                onClick={() => {
                  setEditTeamId(null);
                  setTeamMode(false);
                  reset();
                }}
                type="reset"
                variant="outline"
              >
                <CloseIcon />
              </Button>
            )}

            <Button isLoading={loading} type="submit" variant="primary">
              {editTeamMode ? <CheckCircleIcon /> : <AddIcon />}
            </Button>
          </HStack>
        </form>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <Text fontWeight="bold">Leagues</Text>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table>
              <TableCaption>
                <Flex>
                  <Text>
                    Showing page {page} of {total}
                  </Text>
                  <Flex ml="auto">
                    <Text onClick={decreasePage} cursor="pointer">
                      Prev
                    </Text>
                    <Text mx={2}>|</Text>
                    <Text onClick={increasePage} cursor="pointer">
                      Next
                    </Text>
                  </Flex>
                </Flex>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th></Th>
                  <Th colSpan={COL_SPAN}>Name</Th>
                  <Th colSpan={COL_SPAN}>Coach</Th>
                  <Th>Stadium</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {teams.map((team, index) => (
                  <Tr key={team.id}>
                    <Td>
                      <Text color="secondary">{index + 1}</Text>
                    </Td>
                    <Td>
                      <Avatar name={team.name} src={
                        team.logo ? resolveFile({
                          fileName: team.logo,
                          collectionName: 'team',
                          recordId: team.id,
                        }) : undefined
                      }/>
                    </Td>
                    <Td colSpan={COL_SPAN}>{team.name}</Td>
                    <Td colSpan={COL_SPAN}>{team.coach}</Td>
                    <Td>{team.stadium}</Td>
                    <Td>
                      <EditIcon
                        _hover={{ cursor: 'pointer' }}
                        onClick={() => handleEditTeam(team)}
                      />
                    </Td>
                    <Td>
                      <DeleteIcon
                        _hover={{ cursor: 'pointer' }}
                        color="red.600"
                        onClick={() => handleDeleteTeam(String(team.id), team.name)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
}
