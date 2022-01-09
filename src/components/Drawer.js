import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {VStack, Box, Text, Divider, Pressable, HStack, Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ComicsScreen from '../containers/ComicsScreen';
import CharactersScreen from '../containers/CharactersScreen';

const Drawer = createDrawerNavigator();

const getIcon = screenName => {
  switch (screenName) {
    case 'Comics':
      return 'menu-book';
    case 'Characters':
      return 'person';
    default:
      return undefined;
  }
};

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            User
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            {props.user.email}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                key={index}
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'transparent'
                }
                onPress={event => {
                  props.navigation.navigate(name);
                }}>
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.500'
                    }
                    size="5"
                    as={<MaterialIcons name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.700'
                    }>
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
};

const MyDrawer = ({user}) => {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={props => <CustomDrawerContent {...props} user={user} />}>
        <Drawer.Screen name="Comics">
          {props => <ComicsScreen {...props} user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Characters">
          {props => <CharactersScreen {...props} user={user} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </Box>
  );
};

export default MyDrawer;
