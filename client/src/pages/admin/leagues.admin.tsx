import {
  AddIcon,
  CheckCircleIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import {
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
import { LeagueAttr } from '../../interfaces';
import { useEffect, useState } from 'react';
import { pocketbase } from '../../pocketbase';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { formatDate } from './utils.admin';

const COL_SPAN = 6;

export default function AdminLeagues() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [leagues, setLeagues] = useState<LeagueAttr[]>([]);

  const [editLeagueMode, setEditLeagueMode] = useState(false);
  const [editLeagueId, setEditLeagueId] = useState<string | null>(null);

  const toast = useToast();
  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const fetchLeagues = async () => {
    try {
      if (page < 1 || page > total) return;

      const leagues = await pocketbase
        .collection<LeagueAttr>('league')
        .getList(page, 10, {
          sort: '-created',
          requestKey: null,
        });

      setTotal(leagues.totalPages);
      setLeagues((prev) => _.uniqBy([...prev, ...leagues.items], 'id'));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCreateLeague = async (data: Record<string, string>) => {
    setLoading(true);
    try {
      if (editLeagueMode) {
        console.log('edit', data);

        pocketbase
          .collection<LeagueAttr>('league')
          .update(editLeagueId as string, data)
          .then(() => {
            setEditLeagueMode(false);
            setEditLeagueId(null);

            setLeagues((prev) => {
              prev = prev.map((league) => {
                if (league.id === editLeagueId) {
                  return { ...league, ...data };
                }
                return league;
              });

              return [...prev];
            });

            toast({
              title: 'League updated',
              description: 'League has been updated successfully',
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

      if (!data.title) {
        toast({
          title: 'League Title is required',
          status: 'error',
          isClosable: true,
        });
        return;
      }

      const league = await pocketbase
        .collection<LeagueAttr>('league')
        .create(data);

      setLeagues((prev) => [league, ...prev]);

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

  const handleEditLeague = (league: LeagueAttr) => {
    setEditLeagueMode(true);
    setEditLeagueId(league.id as string);
    setValue('title', league.title);
    setValue('season', league.season);
  };

  const handleDeleteLeague = (id: string) => {
    if (!confirm('Are you sure you want to delete league?')) return;

    setLoading(true);
    pocketbase
      .collection<LeagueAttr>('league')
      .delete(id)
      .then(() => {
        setLeagues((prev) => prev.filter((league) => league.id !== id));
        toast({
          title: 'League deleted',
          description: 'League has been deleted successfully',
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
    fetchLeagues();
  }, []);

  const increasePage = () => page > 1 && setPage((prev) => prev + 1);
  const decreasePage = () => page < total && setPage((prev) => prev - 1);

  return (
    <Box flex={1} p={4}>
      <Card my={4} p={4}>
        <form onSubmit={handleSubmit(handleCreateLeague)}>
          <HStack>
            <FormControl isInvalid={!!errors.title}>
              <Input
                type="text"
                w="100%"
                {...register('title', {
                  required: 'Title is required',
                })}
                bg="#FAF3F391"
                placeholder="League title"
              />

              <FormErrorMessage>
                {errors.title && String(errors.title.message)}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.season}>
              <Input
                type="text"
                w="100%"
                {...register('season')}
                bg="#FAF3F391"
                placeholder="Season"
              />

              <FormErrorMessage>
                {errors.season && String(errors.season.message)}
              </FormErrorMessage>
            </FormControl>

            {editLeagueMode && (
              <Button
                onClick={() => {
                  setEditLeagueId(null);
                  setEditLeagueMode(false);
                  reset();
                }}
                type="reset"
                variant="outline"
              >
                <CloseIcon />
              </Button>
            )}

            <Button isLoading={loading} type="submit" variant="primary">
              {editLeagueMode ? <CheckCircleIcon /> : <AddIcon />}
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
                  <Th colSpan={COL_SPAN}>Title</Th>
                  <Th>Season</Th>
                  <Th>Created</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {leagues.map((league, index) => (
                  <Tr key={league.id}>
                    <Td>
                      <Text color="secondary">{index + 1}</Text>
                    </Td>
                    <Td colSpan={COL_SPAN}>{league.title}</Td>
                    <Td>{league.season ?? 'N/A'}</Td>
                    <Td>{formatDate(league.created)}</Td>
                    <Td>
                      <EditIcon
                        _hover={{ cursor: 'pointer' }}
                        onClick={() => handleEditLeague(league)}
                      />
                    </Td>
                    <Td>
                      <DeleteIcon
                        _hover={{ cursor: 'pointer' }}
                        color="red.600"
                        onClick={() => handleDeleteLeague(String(league.id))}
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
