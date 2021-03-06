/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  HStack,
  Image,
  Text,
  Divider,
  VStack,
  ScrollView,
  Icon,
  IconButton,
  Center,
  Spinner,
  Heading,
  Button,
} from 'native-base';
import {firebase} from '@react-native-firebase/database';
import placeholderImage from '../../assets/images/Placeholder.png';
import PureCreatorItemView from '../../components/CreatorComponents/PureCreatorItemView';
import {GetComic} from '../../api/controllers/comicsController';

const ComicDetails = ({route, navigation, user}) => {
  const [comic, setComic] = useState(null);
  const [favoriteComics, setFavoriteComics] = useState(null);

  const database = firebase
    .app()
    .database(
      'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
    );

  const getComic = async () => {
    var response = await GetComic(route.params.loadFromId);
    setComic(response);
  };

  const addComicToFavorites = async () => {
    database
      .ref('/comics/' + user.uid)
      .once('value')
      .then(value => {
        if (value === null) {
          database.ref('/comics/' + user.uid + '/' + comic.id).set(comic);
        } else {
          database.ref('/comics/' + user.uid + '/' + comic.id).set(comic);
        }
      });
  };

  const removeComicFromFavorites = async () => {
    database.ref('/comics/' + user.uid + '/' + comic.id).remove();
  };

  useEffect(() => {
    database.ref('/comics/' + user.uid).on('value', snapshot => {
      var favoriteComicsDB = snapshot.val();
      if (favoriteComicsDB !== null) {
        favoriteComicsDB = Object.values(favoriteComicsDB);
        var fComics = [];
        favoriteComicsDB.forEach(usersFavoriteComic => {
          fComics.push(usersFavoriteComic);
        });
        setFavoriteComics(fComics);
      } else {
        setFavoriteComics([]);
      }
    });
    if (route.params.comic != null) {
      setComic(route.params.comic);
    }
  }, []);

  useEffect(() => {
    if (route.params.load === true) {
      getComic();
    }
  }, [route.params]);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: comic != null ? 'flex-start' : 'center',
        flexGrow: 1,
      }}
      p={2}>
      {comic != null ? (
        <VStack mb={10}>
          <HStack justifyContent="center" alignItems="center">
            <Image
              alignSelf="center"
              borderColor="black"
              borderWidth={1}
              borderRadius="md"
              justifyContent="center"
              alignItems="center"
              alt={comic.title}
              h={225}
              w={150}
              key={comic.id}
              source={
                comic.thumbnailUrl === true
                  ? placeholderImage
                  : {uri: comic.thumbnailUrl}
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
                {comic.title}
              </Text>
              <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              {comic.format != null ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      Format
                    </Text>
                    : {comic.format}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {comic.seriesName != null ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      Series
                    </Text>
                    : {comic.seriesName}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {comic.issueNumber !== 0 ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      Issue
                    </Text>
                    : #{comic.issueNumber}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {comic.printPrice !== 0 ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      Price
                    </Text>
                    : {comic.printPrice}$
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {comic.pageCount !== 0 ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      Pages
                    </Text>
                    : {comic.pageCount}
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
            {comic.description}
          </Text>
          {favoriteComics &&
          favoriteComics.some(favoritComic => {
            if (favoritComic.id === comic.id) {
              return true;
            } else {
              return false;
            }
          }) ? (
            <Button
              alignSelf="center"
              my={2}
              w="100%"
              onPress={removeComicFromFavorites}
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
              onPress={addComicToFavorites}
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
          {comic.numOfCharacters !== 0 ||
          comic.numOfEvents !== 0 ||
          comic.numOfStories !== 0 ||
          comic.seriesId !== null ? (
            <View>
              <Divider
                mt={3}
                h={1}
                borderRadius={50}
                backgroundColor="red.800"
              />
              <HStack justifyContent="center" alignItems="center">
                {comic.numOfCharacters !== 0 ? (
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
                          screen: 'Characters',
                          params: {
                            id: comic.id,
                            name: comic.title,
                            type: 'comics',
                          },
                        })
                      }
                      icon={
                        <Icon
                          color="white"
                          as={MaterialIcons}
                          name="person"
                          size="sm"
                        />
                      }
                    />
                    <Text textAlign="center" fontSize={14}>
                      Characters
                    </Text>
                  </VStack>
                ) : null}
                {comic.seriesId !== null ? (
                  <VStack mx={2}>
                    <IconButton
                      alignSelf="center"
                      mt={3}
                      variant="solid"
                      backgroundColor="red.800"
                      borderRadius="full"
                      size="lg"
                      onPress={() =>
                        navigation.navigate('SeriesDetails', {
                          loadFromId: comic.seriesId,
                          load: true,
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
                {comic.numOfEvents !== 0 ? (
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
                            id: comic.id,
                            name: comic.name,
                            type: 'comics',
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
                {comic.numOfStories !== 0 ? (
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
                            id: comic.id,
                            name: comic.title,
                            type: 'comics',
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
                pressing the buttons above will bring up this comics specified
                item/s.
              </Text>
            </View>
          ) : null}
          {comic.creators.length > 0 ? (
            <View>
              <Divider
                mt={3}
                h={1}
                borderRadius={50}
                backgroundColor="red.800"
              />
              <VStack m={1} mt={3}>
                <Text
                  textAlign="center"
                  mb={3}
                  key={-1}
                  bold={true}
                  fontSize={18}>
                  Creators
                </Text>
                {comic.creators.map((creator, index) => {
                  return (
                    <PureCreatorItemView
                      key={index}
                      navigation={navigation}
                      item={creator}
                      origin="comics"
                    />
                  );
                })}
              </VStack>
            </View>
          ) : null}
        </VStack>
      ) : (
        <Center>
          <Spinner
            accessibilityLabel="Loading comic"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading comic
          </Heading>
        </Center>
      )}
    </ScrollView>
  );
};

export default ComicDetails;
