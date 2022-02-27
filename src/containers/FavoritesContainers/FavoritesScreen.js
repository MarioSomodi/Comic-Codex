/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavoriteComics from '../../components/FavoriteComponents/FavoriteComics';
import FavoriteCreators from '../../components/FavoriteComponents/FavoriteCreators';
import FavoriteSeries from '../../components/FavoriteComponents/FavoriteSeries';
import FavoriteEvents from '../../components/FavoriteComponents/FavoriteEvents';
import FavoriteStories from '../../components/FavoriteComponents/FavoriteStories';
import FavoriteCharacters from '../../components/FavoriteComponents/FavoriteCharacters';

const FavoritesScreen = ({navigation, user}) => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator shifting={true} barStyle={{backgroundColor: '#991b1b'}}>
      <Tab.Screen
        name="Comics"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="menu-book" color={color} size={26} />
          ),
        }}>
        {props => <FavoriteComics {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Characters"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person" color={color} size={26} />
          ),
        }}>
        {props => <FavoriteCharacters {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Creators"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="edit" color={color} size={26} />
          ),
        }}>
        {props => <FavoriteCreators {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Series"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons
              name="collections-bookmark"
              color={color}
              size={26}
            />
          ),
        }}>
        {props => <FavoriteSeries {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Events"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="event" color={color} size={26} />
          ),
        }}>
        {props => <FavoriteEvents {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Stories"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="library-books" color={color} size={26} />
          ),
        }}>
        {props => <FavoriteStories {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default FavoritesScreen;
