import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import LoginScreen from './src/containers/LoginScreen';
import RegisterScreen from './src/containers/RegisterScreen';

import AppBar from './src/components/AppBar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import MyDrawer from './src/components/Drawer';
import {navigationRef} from './src/components/RootNavigation';

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
    const onAuthStateChanged = user => {
      setUser(user);
      if (initializing) setInitializing(false);
    };
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider theme={theme}>
        <AppBar user={user} />
        {user ? (
          <MyDrawer user={user} />
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="SignIn" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
