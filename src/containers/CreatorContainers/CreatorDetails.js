/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  HStack,
  Text,
  Divider,
  VStack,
  Icon,
  IconButton,
  Center,
  Spinner,
  Heading,
  Button,
} from 'native-base';
import {firebase} from '@react-native-firebase/database';
import {GetCreator} from '../../api/controllers/creatorController';

const CreatorDetails = ({route, navigation, user}) => {
  const [creator, setCreator] = useState(null);
  const [favoriteCreators, setFavoriteCreators] = useState(null);

  const getCreator = async () => {
    var response = await GetCreator(route.params.loadFromId);
    setCreator(response);
  };

  const database = firebase
    .app()
    .database(
      'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
    );

  const addCreatorToFavorites = async () => {
    database
      .ref('/creators/' + user.uid)
      .once('value')
      .then(value => {
        if (value === null) {
          database.ref('/creators/' + user.uid + '/' + creator.id).set(creator);
        } else {
          database.ref('/creators/' + user.uid + '/' + creator.id).set(creator);
        }
      });
  };

  const removeCreatorFromFavorites = async () => {
    database.ref('/creators/' + user.uid + '/' + creator.id).remove();
  };

  useEffect(() => {
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
    if (route.params.creator != null) {
      setCreator(route.params.creator);
    }
  }, []);

  useEffect(() => {
    if (route.params.load === true) {
      getCreator();
    }
  }, [route.params.load]);

  return (
    <View flex={1} justifyContent={creator != null ? 'flex-start' : 'center'}>
      {creator != null ? (
        <Center flex={1}>
          <Text textAlign="center" m={1} bold={true} fontSize={20}>
            {creator.name}
          </Text>
          {creator.numOfComics !== 0 ||
          creator.numOfSeries !== 0 ||
          creator.numOfStories !== 0 ||
          creator.numOfEvents !== 0 ? (
            <View w="90%">
              <Divider
                mt={3}
                h={1}
                borderRadius={50}
                backgroundColor="red.800"
              />
              <HStack justifyContent="center" alignItems="center">
                {creator.numOfComics !== 0 ? (
                  <VStack mx={2}>
                    <IconButton
                      alignSelf="center"
                      mt={3}
                      variant="solid"
                      backgroundColor="red.800"
                      borderRadius="full"
                      size="lg"
                      onPress={() =>
                        navigation.navigate('Root', {
                          screen: 'Comics',
                          params: {
                            id: creator.id,
                            name: creator.name,
                            type: 'creators',
                          },
                        })
                      }
                      icon={
                        <Icon
                          color="white"
                          as={MaterialIcons}
                          name="menu-book"
                          size="sm"
                        />
                      }
                    />
                    <Text textAlign="center" fontSize={14}>
                      Comics
                    </Text>
                  </VStack>
                ) : null}
                {creator.numOfSeries !== null ? (
                  <VStack mx={2}>
                    <IconButton
                      alignSelf="center"
                      mt={3}
                      variant="solid"
                      backgroundColor="red.800"
                      borderRadius="full"
                      size="lg"
                      onPress={() =>
                        navigation.navigate('Root', {
                          screen: 'Series',
                          params: {
                            id: creator.id,
                            name: creator.name,
                            type: 'creators',
                          },
                        })
                      }
                      icon={
                        <Icon
                          color="white"
                          as={MaterialIcons}
                          name="collections-bookmark"
                          size="sm"
                        />
                      }
                    />
                    <Text textAlign="center" fontSize={14}>
                      Series
                    </Text>
                  </VStack>
                ) : null}
                {creator.numOfEvents !== 0 ? (
                  <VStack mx={2}>
                    <IconButton
                      alignSelf="center"
                      mt={3}
                      variant="solid"
                      backgroundColor="red.800"
                      borderRadius="full"
                      size="lg"
                      onPress={() =>
                        navigation.navigate('Root', {
                          screen: 'Events',
                          params: {
                            id: creator.id,
                            name: creator.name,
                            type: 'creators',
                          },
                        })
                      }
                      icon={
                        <Icon
                          color="white"
                          as={MaterialIcons}
                          name="event"
                          size="sm"
                        />
                      }
                    />
                    <Text textAlign="center" fontSize={14}>
                      Events
                    </Text>
                  </VStack>
                ) : null}
                {creator.numOfStories !== 0 ? (
                  <VStack mx={2}>
                    <IconButton
                      alignSelf="center"
                      mt={3}
                      variant="solid"
                      backgroundColor="red.800"
                      borderRadius="full"
                      size="lg"
                      onPress={() =>
                        navigation.navigate('Root', {
                          screen: 'Stories',
                          params: {
                            id: creator.id,
                            name: creator.name,
                            type: 'creators',
                          },
                        })
                      }
                      icon={
                        <Icon
                          color="white"
                          as={MaterialIcons}
                          name="library-books"
                          size="sm"
                        />
                      }
                    />
                    <Text textAlign="center" fontSize={14}>
                      Stories
                    </Text>
                  </VStack>
                ) : null}
              </HStack>
              <Text textAlign="center" mt={2} fontSize={11}>
                <Text mb={-2} fontSize={11} bold={true}>
                  Hint:
                </Text>{' '}
                pressing the buttons above will bring up this creators specified
                item/s.
              </Text>
              <Divider
                mt={3}
                h={1}
                borderRadius={50}
                backgroundColor="red.800"
              />
            </View>
          ) : null}
          {favoriteCreators &&
          favoriteCreators.some(favoritCreator => {
            if (favoritCreator.id === creator.id) {
              return true;
            } else {
              return false;
            }
          }) ? (
            <Button
              alignSelf="center"
              my={2}
              w="90%"
              onPress={removeCreatorFromFavorites}
              variant="solid"
              backgroundColor="red.800"
              borderRadius="full"
              size="lg">
              <HStack alignItems="center">
                <Text color="white" mr={2}>
                  Remove from favorites
                </Text>
                <Icon color="white" as={MaterialIcons} name="star" size="sm" />
              </HStack>
            </Button>
          ) : (
            <Button
              alignSelf="center"
              my={2}
              w="90%"
              onPress={addCreatorToFavorites}
              variant="solid"
              backgroundColor="red.800"
              borderRadius="full"
              size="lg">
              <HStack alignItems="center">
                <Text color="white" mr={2}>
                  Add to favorites
                </Text>
                <Icon
                  color="white"
                  as={MaterialIcons}
                  name="star-outline"
                  size="sm"
                />
              </HStack>
            </Button>
          )}
        </Center>
      ) : (
        <Center>
          <Spinner
            accessibilityLabel="Loading creator"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading creator
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default CreatorDetails;
