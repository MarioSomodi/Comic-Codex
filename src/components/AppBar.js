import React from 'react';
import {View, HStack, Text, Box, StatusBar, Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function AppBar() {
  return (
    <View zIndex={99}>
      <StatusBar backgroundColor="#991b1b" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#991b1b" />
      <HStack bg="red.800" justifyContent="space-between" alignItems="center">
        <Icon
          as={<MaterialIcons name="menu" />}
          size="6"
          ml={3}
          color="white"
        />
        <HStack>
          <Text color="white" fontSize="40" fontWeight="600" fontFamily="comic">
            Comic Codex
          </Text>
        </HStack>
        <Icon
          as={<MaterialIcons name="person" />}
          size="6"
          mr={3}
          color="white"
        />
      </HStack>
    </View>
  );
}

export default AppBar;
