import {
  Center,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
  Text,
  Button,
  Image,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { ElementRef, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthComponentProps } from './auth.interface';

/** components */
import GoogleButton from '../buttons/googleButton';
import FacebookButton from '../buttons/facebookButton';

/** Icons and assets */
import loginDivider from '../../assets/images/loginOrWithDivider.svg';
import { unimplemented } from './auth.utils';

export default function Register({
  isOpen,
  onClose,
  openLogin,
}: AuthComponentProps) {
  const initialRef = useRef<ElementRef<'form'>>(null);
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleLoginClick = () => {
    typeof openLogin === 'function' && openLogin();
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleRegister = async (data: Record<string, string>) => {
    console.log('[register data]:', data);
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent px={4}>
        <ModalHeader color="primary">Register</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(handleRegister)}>
            <Flex gap={3} mb={6}>
              <FormControl isInvalid={!!errors.firstName}>
                <Input
                  type="text"
                  w="100%"
                  {...register('firstName', {
                    required: 'First name is required for sign up',
                  })}
                  bg="#FAF3F391"
                  placeholder="First Name"
                />

                <FormErrorMessage>
                  {errors.firstName && String(errors.firstName.message)}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <Input
                  type="text"
                  w="100%"
                  {...register('lastName', {
                    required: 'Last name is required for sign up',
                  })}
                  bg="#FAF3F391"
                  placeholder="Last Name"
                />

                <FormErrorMessage>
                  {errors.lastName && String(errors.lastName.message)}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl mb={8} isInvalid={!!errors.email}>
              <Input
                type="email"
                w="100%"
                {...register('email', {
                  required: 'Email is required for sign up',
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
                    required: 'Password is required for sign up',
                    minLength: {
                      value: 8,
                      message: 'Password must be 8 characters or more',
                    },
                  })}
                  bg="#FAF3F391"
                  placeholder="Password"
                />
                <InputRightElement
                  onClick={toggleShowPassword}
                  mx={2}
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
              variant="primary"
              type="submit"
            >
              Register
            </Button>
          </form>

          <Image src={loginDivider} mb={5} />

          <GoogleButton onClick={unimplemented} />
          <FacebookButton onClick={unimplemented} />
        </ModalBody>

        <Center>
          <Text>
            Already have an account?
            <Link href="#">
              <span
                onClick={handleLoginClick}
                style={{
                  color: 'primary',
                  textDecoration: 'underline',
                  marginLeft: '.5rem',
                }}
              >
                Sign in
              </span>
            </Link>
          </Text>
        </Center>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
