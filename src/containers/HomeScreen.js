import React, {useEffect, useState, useCallback} from 'react';
import {PresenceTransition, FlatList, View, Image} from 'native-base';
import {getComics} from '../api/comicsController';
import {Dimensions} from 'react-native';
import {isPortrait} from '../utilites/screenOrientation';

const HomeScreen = () => {
  const [comics, setComics] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(
    isPortrait() ? 'portrait' : 'landscape',
  );

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const fetchComics = useCallback(async () => {
    var response = await getComics(null);
    setComics(response);
  }, []);

  useEffect(() => {
    fetchComics();
  }, [fetchComics]);

  return (
    <View flex={1} justifyContent="center">
      {comics && (
        <FlatList
          m={1}
          data={comics}
          renderItem={({item}) => {
            var index = comics.findIndex(x => x === item);
            return (
              <View flex={1} flexDirection="column" m={0.5}>
                <PresenceTransition
                  visible={true}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 150 + (index + 1) * (comics.length - index),
                    },
                  }}>
                  <Image
                    borderRadius="md"
                    justifyContent="center"
                    alignItems="center"
                    alt={item.title}
                    h={screenOrientation === 'landscape' ? 250 : 200}
                    source={{uri: item.thumbnailUrl}}
                  />
                </PresenceTransition>
              </View>
            );
          }}
          numColumns={screenOrientation === 'landscape' ? 4 : 3}
          keyExtractor={item => item.id}
          key={screenOrientation === 'landscape' ? 1 : 2}
        />
      )}
    </View>
  );
};

export default HomeScreen;
