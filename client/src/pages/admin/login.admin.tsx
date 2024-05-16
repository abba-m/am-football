import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { pocketbase } from '../../pocketbase';
import { AdminAttr, useAdminStore } from '../../store/admin.store';

export default function AdminLogin() {
  const navigate = useNavigate();
  const toast = useToast();

  const { setAdmin, setToken, isAuthenticated } = useAdminStore();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data: Record<string, string>) => {
    setLoading(true);
    try {
      if (!data.email || !data.password) {
        toast({
          title: 'Failed to login',
          description: 'Email and password are required',
          status: 'error',
          isClosable: true,
        });
        return;
      }

      const auth = await pocketbase.admins.authWithPassword(data.email, data.password);

      setToken(auth.token);
      setAdmin(auth.admin as AdminAttr);

      reset();
      navigate('/admin-home');
    } catch (error: any) {
      if (error?.data?.code) {
        const isAuthErr = error.data.message == 'Failed to authenticate.'
        toast({
          position: 'top',
          title: 'Failed to login',
          description: isAuthErr ? 'Invalid Email/Password' : error.data.message,
          status: 'error',
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin-home');
    }
  }, []);

  return (
    <Container background="gray.200" maxW="1440px" minH="80dvh">
      <Box h={4}></Box>
      <Box maxW="lg" mx="auto" background="whitesmoke">
        {/* Form */}
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl mb={6} isInvalid={!!errors.email}>
              <Input
                type="email"
                w="100%"
                {...register('email', {
                  required: 'Email is required for sign in',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: 'Invalid email address',
                  },
                })}
                bg="#FAF3F391"
                placeholder="Email"
              />

              <FormErrorMessage>
                {errors.email && String(errors.email.message)}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={8} isInvalid={!!errors.password}>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  w="100%"
                  {...register('password', {
                    required: 'Password is required for sign in',
                  })}
                  name="password"
                  bg="#FAF3F391"
                  placeholder="Password"
                />
                <InputRightElement
                  onClick={toggleShowPassword}
                  mr={2}
                  children={
                    <span
                      style={{
                        cursor: 'pointer',
                        color: 'teal',
                        border: '.5px solid teal',
                        fontSize: '12px',
                        paddingInline: '3px',
                        borderRadius: '15%',
                        boxShadow: '0 0 2px 0 rgba(0,0,0,0.2)',
                      }}
                    >
                      {showPassword ? 'hide' : 'show'}
                    </span>
                  }
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.password && String(errors.password.message)}
              </FormErrorMessage>
            </FormControl>

            <Button
              w="100%"
              isLoading={loading}
              mb={4}
              type="submit"
              variant="primary"
            >
              Sign in
            </Button>
          </form>

          <Center mb={2}>
            <Text>
              Forgotten password?
              <Link href="">
                <span
                  onClick={() => navigate('/reset-password')}
                  style={{
                    color: 'primary',
                    textDecoration: 'underline',
                    marginLeft: '.5rem',
                  }}
                >
                  Reset password
                </span>
              </Link>
            </Text>
          </Center>
        </Box>
      </Box>
      <Box h={4}></Box>
    </Container>
  );
}
