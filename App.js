import React from 'react';
import {NativeBaseProvider, extendTheme, useColorMode, Text} from 'native-base';
import LoginScreen from './src/containers/LoginScreen';
import RegisterScreen from './src/containers/RegisterScreen';
import AppBar from './src/components/AppBar';

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

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <AppBar />
      <RegisterScreen />
    </NativeBaseProvider>
  );
};
export default App;
