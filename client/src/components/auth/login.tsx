import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useToast,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ElementRef, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useDispatch } from "react-redux";

/** Api request methods */
// import { loginSuccess } from "store/actions";
// import { postRequest } from "services/request";
// import { useMutation } from "@tanstack/react-query";

/** components */
import GoogleButton from '../buttons/googleButton';
import FacebookButton from '../buttons/facebookButton';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

/**Icons */
import loginDivider from '../../assets/images/loginOrWithDivider.svg';
import { AuthComponentProps } from './auth.interface';
import { unimplemented } from './auth.utils';
import { pocketbase } from '../../pocketbase';
import { UserAttr, useCurrentUserStore } from '../../store/auth';

export default function Login({
  isOpen,
  onClose,
  openRegister,
}: AuthComponentProps) {
  const initialRef = useRef<ElementRef<'form'>>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { setUser, setToken } = useCurrentUserStore();

  const handleRegisterClick = () => {
    typeof openRegister === 'function' && openRegister();
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const gotoResetPasswordPage = () => {
    onClose();
    navigate('/reset-password');
  };

  const handleLogin = async ({
    email,
    password,
  }: Record<string, string>) => {
    setLoading(true);

    if (!email || !password)
      toast({
        position: 'top',
        title: 'Email and password are required',
        status: 'error',
        isClosable: true,
      });

    try {
      const authData = await pocketbase
        .collection('users')
        .authWithPassword(email, password);

      setToken(authData.token);
      console.log('[authdata]:', authData.record);
      setUser(authData.record as UserAttr);

      toast({
        position: 'top',
        title: 'Account created successfully',
        status: 'success',
        isClosable: true,
      });

      onClose();
      reset();
    } catch (error: any) {
      toast({
        position: 'top',
        title: error?.data?.code == 400
            ? 'Invalid login credentials'
            : error?.data?.message || 'Failed to create account',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent px={4}>
        <ModalHeader color="primary">Sign in</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl mb={6} isInvalid={!!errors.email}>
              <Input
                type="text"
                w="100%"
                {...register('email', {
                  required: 'Email is required for sign in',
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
                  onClick={() => gotoResetPasswordPage()}
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

          <Image src={loginDivider} mb={5} />

          <GoogleButton onClick={unimplemented} />
          <FacebookButton onClick={unimplemented} />
        </ModalBody>

        <Center>
          <Text>
            Don't have an account?
            <Link href="#">
              <span
                onClick={handleRegisterClick}
                style={{
                  color: 'primary',
                  textDecoration: 'underline',
                  marginLeft: '.5rem',
                }}
              >
                Register
              </span>
            </Link>
          </Text>
        </Center>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
