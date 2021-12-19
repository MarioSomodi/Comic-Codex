import React, {useState} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Center,
  WarningOutlineIcon,
  Icon,
  HStack,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DismissKeyboard from '../components/DismissKeyboard';
import hasNumber from '../utilites/hasNumber';

export const LoginScreen = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const getObjWithoutKey = (obj, key) => {
    if (errors.hasOwnProperty(key)) {
      delete obj[key];
    }
    return obj;
  };

  const validate = () => {
    var validationEmail = true;
    var validationPassword = true;
    if (
      formData.password === undefined ||
      formData.password.trim().length === 0
    ) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password is required',
      }));
      validationPassword = false;
    } else if (formData.password.length < 6) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password is too short',
      }));
      validationPassword = false;
    } else if (!hasNumber(formData.password)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password has to have atleast one numeric character',
      }));
      validationPassword = false;
    }
    if (formData.email === undefined || formData.email.trim().length === 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Email is required',
      }));
      validationEmail = false;
    } else if (
      !formData.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Email is not valid',
      }));
      validationEmail = false;
    }
    if (validationEmail) {
      setErrors(prevErrors => getObjWithoutKey(prevErrors, 'email'));
    }
    if (validationPassword) {
      setErrors(prevErrors => getObjWithoutKey(prevErrors, 'password'));
    }
    if (validationEmail && validationPassword) {
      setErrors({});
      return true;
    }
  };

  const handleClick = () => setShowPassword(!showPassword);
  const onSubmit = () => validate();

  return (
    <Center flex={1}>
      <DismissKeyboard
        children={
          <Box safeArea w="100%" maxW="400" p={4}>
            <Heading
              fontSize={50}
              textAlign="center"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}>
              Welcome
            </Heading>
            <Heading
              mt={1}
              textAlign="center"
              fontSize={15}
              ml={1}
              color="coolGray.600"
              fontWeight="600"
              _dark={{
                color: 'warmGray.200',
              }}>
              Sign in to continue!
            </Heading>
            <VStack space={6} mt={8}>
              <FormControl isRequired isInvalid={'email' in errors}>
                <Input
                  variant="rounded"
                  placeholder="Email..."
                  onBlur={validate}
                  onChangeText={value =>
                    setFormData({...formData, email: value})
                  }
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="email" />}
                      size="6"
                      ml={3}
                      color="muted.400"
                    />
                  }
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                  _text={{fontSize: 'xs'}}
                  ml={4}>
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={'password' in errors}>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  variant="rounded"
                  onBlur={validate}
                  onChangeText={value =>
                    setFormData({...formData, password: value})
                  }
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name={showPassword ? 'visibility-off' : 'visibility'}
                        />
                      }
                      size="6"
                      mr={3}
                      color="muted.400"
                      onPress={handleClick}
                    />
                  }
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="vpn-key" />}
                      size="6"
                      ml={3}
                      color="muted.400"
                    />
                  }
                  placeholder="Password..."
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                  _text={{fontSize: 'xs'}}
                  ml={4}>
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button colorScheme="red" onPress={onSubmit}>
                Sign in
              </Button>
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'red.800',
                }}
                alignSelf="center">
                Forget Password?
              </Link>
              <HStack justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  I'm a new user.{' '}
                </Text>
                <Link
                  _text={{
                    color: 'red.800',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  href="#">
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </Box>
        }
      />
    </Center>
  );
};

export default LoginScreen;
