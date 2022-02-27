/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {firebase} from '@react-native-firebase/database';
import {View, Center, Spinner, Heading, FlatList} from 'native-base';
import PureStoryItemView from '../StoryComponents/PureStoryItemView';

const FavoriteStories = ({navigation, user}) => {
  const [favoriteStories, setFavoriteStories] = useState(null);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const getFavoriteStories = async () => {
    try {
      const database = firebase
        .app()
        .database(
          'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
        );
      var DB = await database.ref('/stories').on('value', snapshot => {
        var favoriteStoriesDB = snapshot.val();
        favoriteStoriesDB.shift();
        if (favoriteStoriesDB !== undefined && favoriteStoriesDB.length > 0) {
          favoriteStoriesDB.forEach(usersFavoriteStories => {
            if (usersFavoriteStories.userUID === user.uid) {
              var fStories = [];
              usersFavoriteStories.favoriteStories.forEach(favoriteStory => {
                fStories.push(favoriteStory);
              });
              setFavoriteStories(fStories);
            }
          });
        } else {
          setFavoriteStories([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = useCallback(({item}) => {
    return <PureStoryItemView navigation={navigation} item={item} />;
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    getFavoriteStories();
  }, []);

  return favoriteStories !== null ? (
    favoriteStories.length !== 0 ? (
      <View flex={1} justifyContent="center">
        <FlatList
          getItemLayout={getItemLayout}
          flex={3}
          m={1}
          data={favoriteStories}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          key={1}
        />
      </View>
    ) : (
      <Center flex={1}>
        <Heading color="red.800" fontSize="lg">
          You have not favorited any stories yet.
        </Heading>
      </Center>
    )
  ) : (
    <Center flex={1}>
      <Spinner accessibilityLabel="Loading Stories" color="red.800" size="lg" />
      <Heading color="red.800" fontSize="lg">
        Loading your favorite stories
      </Heading>
    </Center>
  );
};

export default FavoriteStories;
