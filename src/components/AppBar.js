import React from 'react';
import {View, HStack, Text, Box, StatusBar, Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useNavigationState,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

function AppBar({user}) {
  const navigation = useNavigation();
  const stateIndex = useNavigationState(state => state.index);
  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View zIndex={99}>
      <StatusBar backgroundColor="#991b1b" barStyle="light-content" />
      <Box safeAreaTop bg="red.800" />
      <HStack
        bg="red.800"
        justifyContent={user ? 'space-between' : 'center'}
        alignItems="center">
        {user && (
          <>
            {stateIndex === 0 ? (
              <Icon
                as={<MaterialIcons name="menu" />}
                size="6"
                ml={3}
                color="white"
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              />
            ) : (
              <Icon
                as={<MaterialIcons name="keyboard-backspace" />}
                size="6"
                ml={3}
                color="white"
                onPress={() => navigation.goBack()}
              />
            )}
          </>
        )}
        <HStack>
          <Text color="white" fontSize="40" fontWeight="600" fontFamily="comic">
            Comic Codex
          </Text>
        </HStack>
        {user && (
          <Icon
            as={<MaterialIcons name="exit-to-app" />}
            onPress={signOutUser}
            size="6"
            mr={3}
            color="white"
          />
        )}
      </HStack>
    </View>
  );
}

export default AppBar;
