import React, {useState, useEffect} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  ScrollView,
  Link,
  Button,
  WarningOutlineIcon,
  Icon,
  HStack,
  Center,
  PresenceTransition,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DismissKeyboard from '../components/DismissKeyboard';
import auth from '@react-native-firebase/auth';
import {emailValidator, passwordValidator} from '../utilites/validation';
import useForceUpdate from '../components/useForceUpdate';

export const LoginScreen = ({navigation}) => {
  const forceUpdate = useForceUpdate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const getObjWithoutKey = (obj, key) => {
    if (errors.hasOwnProperty(key)) {
      delete obj[key];
    }
    return obj;
  };

  const validateEmail = () => {
    var validationResult = emailValidator(formData.email);
    if (validationResult.status) {
      setErrors(prevErrors => getObjWithoutKey(prevErrors, 'email'));
    } else if (!validationResult.status) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: validationResult.errorMessage,
      }));
    }
    forceUpdate();
    return validationResult.status;
  };
  const validatePassword = () => {
    var validationResult = passwordValidator(formData.password);
    if (validationResult.status) {
      setErrors(prevErrors => getObjWithoutKey(prevErrors, 'password'));
    } else if (!validationResult.status) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: validationResult.errorMessage,
      }));
    }
    forceUpdate();
    return validationResult.status;
  };

  const validate = () => {
    console.log('called');
    var passwordResult = validatePassword();
    var emailResult = validateEmail();
    if (passwordResult && emailResult) {
      setErrors({});
      return true;
    }
    console.log(errors);
    return false;
  };

  const handleClick = () => setShowPassword(!showPassword);
  const loginUser = () => {
    if (validate()) {
      auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log('Success');
        })
        .catch(error => {
          if ('auth/user-not-found') {
            setResponseMessage('Wrong password or email!');
          } else {
            setResponseMessage(null);
            console.log(error);
          }
        });
    }
  };

  return (
    <PresenceTransition
      flex={1}
      visible={true}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 250,
        },
      }}>
      <ScrollView
        flex={1}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{justifyContent: 'center'}}>
        <Center>
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
                      onBlur={validateEmail}
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
                      onBlur={validatePassword}
                      onChangeText={value =>
                        setFormData({...formData, password: value})
                      }
                      InputRightElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name={
                                showPassword ? 'visibility-off' : 'visibility'
                              }
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
                  {responseMessage && (
                    <Text
                      textAlign="center"
                      leftIcon={<WarningOutlineIcon size="xs" />}
                      fontSize={'xs'}
                      color="red.600">
                      {responseMessage}
                    </Text>
                  )}
                  <Button
                    borderRadius={25}
                    bg="red.800"
                    _text={{
                      fontSize: 'md',
                      fontWeight: '500',
                    }}
                    _pressed={{
                      bg: 'red.900',
                    }}
                    onPress={loginUser}>
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
                      onPress={() => navigation.replace('SignUp')}>
                      Sign Up
                    </Link>
                  </HStack>
                </VStack>
              </Box>
            }
          />
        </Center>
      </ScrollView>
    </PresenceTransition>
  );
};

export default LoginScreen;
