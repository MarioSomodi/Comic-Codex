import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider, extendTheme} from 'native-base';
import LoginScreen from './src/containers/AuthContainers/LoginScreen';
import RegisterScreen from './src/containers/AuthContainers/RegisterScreen';
import AppBar from './src/components/AppBar';
import MyDrawer from './src/components/Drawer';
import {navigationRef} from './src/components/RootNavigation';
import ComicDetails from './src/containers/ComicContainers/ComicDetails';
import CharacterDetails from './src/containers/CharacterContainers/CharacterDetails';

const theme = extendTheme({
  fontConfig: {
    BadaboomBB: {
      600: {
        normal: 'BadaboomBB_Reg',
        italic: 'BadaboomBB_Reg',
      },
    },
  },
  fonts: {
    comic: 'BadaboomBB',
  },
});

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const onAuthStateChanged = userObj => {
      setUser(userObj);
      if (initializing) {
        setInitializing(false);
      }
    };
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider theme={theme}>
        {user ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Root">
              {props => (
                <>
                  <AppBar {...props} user={user} />
                  <MyDrawer {...props} user={user} />
                </>
              )}
            </Stack.Screen>
            <Stack.Screen name="ComicDetails" options={{unmountOnBlur: true}}>
              {props => (
                <>
                  <AppBar {...props} user={user} />
                  <ComicDetails {...props} user={user} />
                </>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="CharacterDetails"
              options={{unmountOnBlur: true}}>
              {props => (
                <>
                  <AppBar {...props} user={user} />
                  <CharacterDetails {...props} user={user} />
                </>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="SignIn">
              {props => (
                <>
                  <AppBar {...props} user={user} />
                  <LoginScreen {...props} />
                </>
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {props => (
                <>
                  <AppBar {...props} user={user} />
                  <RegisterScreen {...props} />
                </>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
