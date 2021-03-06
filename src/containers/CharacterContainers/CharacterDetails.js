/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  HStack,
  Image,
  Text,
  VStack,
  Divider,
  IconButton,
  Icon,
  ScrollView,
  Center,
  Spinner,
  Heading,
  Button,
} from 'native-base';
import {firebase} from '@react-native-firebase/database';
import placeholderImage from '../../assets/images/Placeholder.png';
import {GetCharacter} from '../../api/controllers/charactersController';

const CharacterDetails = ({navigation, route, user}) => {
  const [character, setCharacter] = useState(null);
  const [favoriteCharacters, setFavoriteCharacters] = useState(null);

  const getCharacter = async () => {
    var response = await GetCharacter(route.params.loadFromId);
    setCharacter(response);
  };

  const database = firebase
    .app()
    .database(
      'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
    );

  const addCharacterToFavorites = async () => {
    database
      .ref('/characters/' + user.uid)
      .once('value')
      .then(value => {
        if (value === null) {
          database
            .ref('/characters/' + user.uid + '/' + character.id)
            .set(character);
        } else {
          database
            .ref('/characters/' + user.uid + '/' + character.id)
            .set(character);
        }
      });
  };

  const removeCharacterFromFavorites = async () => {
    database.ref('/characters/' + user.uid + '/' + character.id).remove();
  };

  useEffect(() => {
    database.ref('/characters/' + user.uid).on('value', snapshot => {
      var favoriteCharactersDB = snapshot.val();
      if (favoriteCharactersDB !== null) {
        favoriteCharactersDB = Object.values(favoriteCharactersDB);
        var fCharacters = [];
        favoriteCharactersDB.forEach(usersFavoriteCharacter => {
          fCharacters.push(usersFavoriteCharacter);
        });
        setFavoriteCharacters(fCharacters);
      } else {
        setFavoriteCharacters([]);
      }
    });
    if (route.params.character != null) {
      setCharacter(route.params.character);
    }
  }, []);

  useEffect(() => {
    if (route.params.load === true) {
      getCharacter();
    }
  }, [route.params.load]);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: character != null ? 'flex-start' : 'center',
        flexGrow: 1,
      }}
      p={2}>
      {character != null ? (
        <VStack>
          <HStack>
            <Image
              borderColor="black"
              borderWidth={1}
              borderRadius="md"
              justifyContent="center"
              alignItems="center"
              alt={character.name}
              h={225}
              w={150}
              key={character.id}
              source={
                character.thumbnailUrl === true
                  ? placeholderImage
                  : {uri: character.thumbnailUrl}
              }
            />
            <Divider
              w={1}
              mx={2}
              orientation="vertical"
              borderRadius={50}
              backgroundColor="red.800"
            />
            <VStack flex={1}>
              <Text m={1} bold={true} fontSize={20}>
                {character.name}
              </Text>
              <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              <Text m={1} bold={true} fontSize={18}>
                Appears in
              </Text>
              {character.numOfComics !== 0 ? (
                <View>
                  <Text m={1} fontSize={16}>
                    <Text bold={true} fontSize={17}>
                      Comics
                    </Text>
                    : {character.numOfComics}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {character.numOfEvents !== 0 ? (
                <View>
                  <Text m={1} fontSize={16}>
                    <Text bold={true} fontSize={17}>
                      Events
                    </Text>
                    : {character.numOfEvents}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {character.numOfStories !== 0 ? (
                <View>
                  <Text m={1} fontSize={16}>
                    <Text bold={true} fontSize={17}>
                      Stories
                    </Text>
                    : {character.numOfStories}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {character.numOfSeries !== 0 ? (
                <View>
                  <Text m={1} fontSize={16}>
                    <Text bold={true} fontSize={17}>
                      Series
                    </Text>
                    : {character.numOfSeries}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
            </VStack>
          </HStack>
          <Text m={1} mt={3} fontSize={15}>
            {character.description}
          </Text>
          {favoriteCharacters &&
          favoriteCharacters.some(favoriteCharacter => {
            if (favoriteCharacter.id === character.id) {
              return true;
            } else {
              return false;
            }
          }) ? (
            <Button
              alignSelf="center"
              my={2}
              w="100%"
              onPress={removeCharacterFromFavorites}
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
              w="100%"
              onPress={addCharacterToFavorites}
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
          {character.numOfComics !== 0 ||
          character.numOfEvents !== 0 ||
          character.numOfStories !== 0 ||
          character.numOfSeries !== 0 ? (
            <View>
              <Divider
                mt={3}
                h={1}
                borderRadius={50}
                backgroundColor="red.800"
              />
              <HStack justifyContent="center" alignItems="center">
                {character.numOfComics !== 0 ? (
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
                            id: character.id,
                            name: character.name,
                            type: 'characters',
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
                {character.numOfSeries !== 0 ? (
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
                            id: character.id,
                            name: character.name,
                            type: 'characters',
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
                {character.numOfEvents !== 0 ? (
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
                            id: character.id,
                            name: character.name,
                            type: 'characters',
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
                {character.numOfStories !== 0 ? (
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
                            id: character.id,
                            name: character.name,
                            type: 'characters',
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
                pressing the buttons above will bring up this characters
                specified item/s.
              </Text>
              <Divider
                mt={3}
                h={1}
                borderRadius={50}
                backgroundColor="red.800"
              />
            </View>
          ) : null}
        </VStack>
      ) : (
        <Center>
          <Spinner
            accessibilityLabel="Loading character"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading character
          </Heading>
        </Center>
      )}
    </ScrollView>
  );
};

export default CharacterDetails;
