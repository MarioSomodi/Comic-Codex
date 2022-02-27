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
import {GetStory} from '../../api/controllers/storiesController';

const StoryDetails = ({route, navigation}) => {
  const [story, setStory] = useState(null);

  const getStory = async () => {
    var response = await GetStory(route.params.loadFromId);
    setStory(response);
  };

  useEffect(() => {
    if (route.params.story != null) {
      setStory(route.params.story);
    }
  }, []);

  useEffect(() => {
    if (route.params.load === true) {
      getStory();
    }
  }, [route.params.load]);

  return (
    <View flex={1} justifyContent={story != null ? 'flex-start' : 'center'}>
      {story != null ? (
        <Center flex={1}>
          <Text textAlign="center" m={1} bold={true} fontSize={20}>
            {story.title}
          </Text>
          {story.charactersAvailable !== 0 ||
          story.seriesAvailable !== 0 ||
          story.comicsAvailable !== 0 ||
          story.eventsAvailable !== 0 ? (
            <View w="90%">
              <Divider
                mt={3}
                h={1}
                borderRadius={50}
                backgroundColor="red.800"
              />
              <HStack justifyContent="center" alignItems="center">
                {story.comicsAvailable !== 0 ? (
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
                            id: story.id,
                            name: story.title,
                            type: 'stories',
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
                {story.seriesAvailable !== null ? (
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
                            id: story.id,
                            name: story.title,
                            type: 'stories',
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
                {story.eventsAvailable !== 0 ? (
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
                            id: story.id,
                            name: story.title,
                            type: 'stories',
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
                {story.charactersAvailable !== 0 ? (
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
                            id: story.id,
                            name: story.title,
                            type: 'stories',
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
              </HStack>
              <Text textAlign="center" mt={2} fontSize={11}>
                <Text mb={-2} fontSize={11} bold={true}>
                  Hint:
                </Text>{' '}
                pressing the buttons above will bring up this stories specified
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
          <Text my={3}>{story.description}</Text>
        </Center>
      ) : (
        <Center>
          <Spinner accessibilityLabel="Loading" color="red.800" size="lg" />
          <Heading color="red.800" fontSize="lg">
            Loading story
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default StoryDetails;
