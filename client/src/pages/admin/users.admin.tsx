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
import { useEffect, useState } from 'react';
import { pocketbase } from '../../pocketbase';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { formatDate } from './utils.admin';
import { UserAttr } from '../../store/auth';
import { resolveFile } from '../../utils';

const COL_SPAN = 3;

export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserAttr[]>([]);

  const [editUserMode, setEditUserMode] = useState(false);
  const [editUserId, setUserId] = useState<string | null>(null);

  const toast = useToast();
  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const fetchUsers = async () => {
    try {
      if (page < 1 || page > total) return;

      const users = await pocketbase
        .collection<UserAttr>('users')
        .getList(page, 10, {
          sort: '-created',
          requestKey: null,
        });

      setTotal(users.totalPages);
      setUsers((prev) => _.uniqBy([...prev, ...users.items], 'id'));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCreateUser = async (data: Record<string, string>) => {
    setLoading(true);
    try {
      if (editUserMode) {
        console.log('edit', data);

        pocketbase
          .collection<UserAttr>('users')
          .update(editUserId as string, data)
          .then(() => {
            setEditUserMode(false);
            setUserId(null);

            setUsers((prev) => {
              prev = prev.map((user) => {
                if (user.id === editUserId) {
                  return { ...user, ...data };
                }
                return user;
              });

              return [...prev];
            });

            toast({
              title: 'User updated',
              description: 'user updated successfully',
              status: 'success',
              isClosable: true,
            });
            reset();
          })
          .catch((error: any) => {
            if (error?.data?.code)
              toast({
                title: 'Failed to update',
                description: error.data.message,
                status: 'error',
                isClosable: true,
              });
          })
          .finally(() => setLoading(false));

        return;
      }

      const user = await pocketbase
        .collection<UserAttr>('users')
        .create({ ...data, passwordConfirm: data.password });

      setUsers((prev) => [user, ...prev]);

      toast({
        title: 'User created',
        description: `${user.name} has been created successfully`,
        status: 'success',
        isClosable: true,
      });

      reset();
    } catch (error: any) {
      if (error?.data?.code)
        toast({
          title: 'Failed to create user',
          description: error.data.message,
          status: 'error',
          isClosable: true,
        });
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: UserAttr) => {
    setEditUserMode(true);
    setUserId(user.id as string);
    setValue('name', user.name);
    setValue('email', user.email);
  };

  const handleDeleteLeague = (id: string) => {
    if (!confirm('Are you sure you want to delete league?')) return;

    setLoading(true);
    pocketbase
      .collection<UserAttr>('users')
      .delete(id)
      .then(() => {
        setUsers((prev) => prev.filter((league) => league.id !== id));
        toast({
          title: 'User deleted',
          description: 'user deleted successfully',
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
    fetchUsers();
  }, []);

  const increasePage = () => page > 1 && setPage((prev) => prev + 1);
  const decreasePage = () => page < total && setPage((prev) => prev - 1);

  return (
    <Box flex={1} p={4}>
      <Card my={4} p={4}>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <HStack>
            <FormControl isInvalid={!!errors.name}>
              <Input
                type="text"
                w="100%"
                {...register('name', {
                  required: 'Name is required',
                })}
                bg="#FAF3F391"
                placeholder="User's name"
              />

              <FormErrorMessage>
                {errors.title && String(errors.title.message)}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <Input
                type="email"
                w="100%"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: 'Invalid email address',
                  },
                })}
                bg="#FAF3F391"
                placeholder="User's email"
              />

              <FormErrorMessage>
                {errors.email && String(errors.email.message)}
              </FormErrorMessage>
            </FormControl>

            {!editUserMode && (
              <FormControl isInvalid={!!errors.password}>
                <Input
                  type="text"
                  w="100%"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'password must be 8 chars or longer',
                    },
                  })}
                  bg="#FAF3F391"
                  placeholder="User's password"
                />

                <FormErrorMessage>
                  {errors.password && String(errors.password.message)}
                </FormErrorMessage>
              </FormControl>
            )}

            {editUserMode && (
              <Button
                onClick={() => {
                  setUserId(null);
                  setEditUserMode(false);
                  reset();
                }}
                type="reset"
                variant="outline"
              >
                <CloseIcon />
              </Button>
            )}

            <Button isLoading={loading} type="submit" variant="primary">
              {editUserMode ? <CheckCircleIcon /> : <AddIcon />}
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
                  <Th colSpan={COL_SPAN}>Email</Th>
                  <Th>Joined</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user, index) => (
                  <Tr key={user.id}>
                    <Td>
                      <Text color="secondary">{index + 1}</Text>
                    </Td>
                    <Td>
                      <Avatar
                        name={user.name}
                        src={
                          user.avatar
                            ? resolveFile({
                                fileName: user.avatar as string,
                                collectionName: 'user',
                                recordId: user.id as string,
                              })
                            : undefined
                        }
                      />
                    </Td>
                    <Td colSpan={COL_SPAN}>{user.name}</Td>
                    <Td colSpan={COL_SPAN}>{user.email}</Td>
                    <Td>{formatDate(user.created as string)}</Td>
                    <Td>
                      <EditIcon
                        _hover={{ cursor: 'pointer' }}
                        onClick={() => handleEditUser(user)}
                      />
                    </Td>
                    <Td>
                      <DeleteIcon
                        _hover={{ cursor: 'pointer' }}
                        color="red.600"
                        onClick={() => handleDeleteLeague(String(user.id))}
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
