import React, {useEffect, useState} from 'react';
import {
  PresenceTransition,
  FlatList,
  View,
  Box,
  Image,
  Text,
} from 'native-base';
import {getComics} from '../api/comicsController';

const HomeScreen = ({user}) => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      await getComics(null);
    };
    // setComics(callApi());
  }, []);

  return <Text>Home</Text>;
};

export default HomeScreen;
