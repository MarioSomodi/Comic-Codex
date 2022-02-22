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
} from 'native-base';
import {GetCreator} from '../../api/controllers/creatorController';

const CreatorDetails = ({route, navigation}) => {
  const [creator, setCreator] = useState(null);

  const getCreator = async () => {
    var response = await GetCreator(route.params.loadFromId);
    setCreator(response);
  };

  useEffect(() => {
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
                      // onPress={() =>
                      //   navigation.navigate('Root', {
                      //     screen: 'Characters',
                      //     params: {id: comic.id, title: comic.title},
                      //   })
                      // }
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
                      // onPress={() =>
                      //   navigation.navigate('Root', {
                      //     screen: 'Characters',
                      //     params: {id: comic.id, title: comic.title},
                      //   })
                      // }
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
                      // onPress={() =>
                      //   navigation.navigate('Root', {
                      //     screen: 'Characters',
                      //     params: {id: comic.id, title: comic.title},
                      //   })
                      // }
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
