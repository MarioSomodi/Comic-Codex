import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {VStack, Box, Text, Divider, Pressable, HStack, Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ComicsScreen from '../containers/ComicContainers/ComicsScreen';
import CharactersScreen from '../containers/CharacterContainers/CharactersScreen';
import CreatorsScreen from '../containers/CreatorContainers/CreatorsScreen';
import SeriesScreen from '../containers/SeriesContainers/SeriesScreen';
import EventsScreen from '../containers/EventContainers/EventsScreen';
import StoriesScreen from '../containers/StoryContainers/StoriesScreen';
import FavoritesScreen from '../containers/FavoritesContainers/FavoritesScreen';

const Drawer = createDrawerNavigator();

const getIcon = screenName => {
  switch (screenName) {
    case 'Comics':
      return 'menu-book';
    case 'Characters':
      return 'person';
    case 'Creators':
      return 'edit';
    case 'Series':
      return 'collections-bookmark';
    case 'Events':
      return 'event';
    case 'Stories':
      return 'library-books';
    case 'Favorites':
      return 'star';
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
        backBehavior="history"
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
        <Drawer.Screen name="Creators">
          {props => <CreatorsScreen {...props} user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Series">
          {props => <SeriesScreen {...props} user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Events">
          {props => <EventsScreen {...props} user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Stories">
          {props => <StoriesScreen {...props} user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Favorites">
          {props => <FavoritesScreen {...props} user={user} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </Box>
  );
};

export default MyDrawer;
