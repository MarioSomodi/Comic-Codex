/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {firebase} from '@react-native-firebase/database';
import {View, Center, Spinner, Heading, FlatList} from 'native-base';
import PureCreatorItemView from '../CreatorComponents/PureCreatorItemView';

const FavoriteCreators = ({navigation, user}) => {
  const [favoriteCreators, setFavoriteCreators] = useState(null);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const getFavoriteCreators = async () => {
    try {
      const database = firebase
        .app()
        .database(
          'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
        );
      database.ref('/creators/' + user.uid).on('value', snapshot => {
        var favoriteCreatorsDB = snapshot.val();
        if (favoriteCreatorsDB !== null) {
          favoriteCreatorsDB = Object.values(favoriteCreatorsDB);
          var fCreators = [];
          favoriteCreatorsDB.forEach(usersFavoriteCreator => {
            fCreators.push(usersFavoriteCreator);
          });
          setFavoriteCreators(fCreators);
        } else {
          setFavoriteCreators([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = useCallback(({item}) => {
    return <PureCreatorItemView navigation={navigation} item={item} />;
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    getFavoriteCreators();
  }, []);

  return favoriteCreators !== null ? (
    favoriteCreators.length !== 0 ? (
      <View flex={1} justifyContent="center">
        <FlatList
          getItemLayout={getItemLayout}
          flex={3}
          m={1}
          data={favoriteCreators}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          key={1}
        />
      </View>
    ) : (
      <Center flex={1}>
        <Heading color="red.800" fontSize="lg">
          You have not favorited any creators yet.
        </Heading>
      </Center>
    )
  ) : (
    <Center flex={1}>
      <Spinner
        accessibilityLabel="Loading Creators"
        color="red.800"
        size="lg"
      />
      <Heading color="red.800" fontSize="lg">
        Loading your favorite creators
      </Heading>
    </Center>
  );
};

export default FavoriteCreators;
