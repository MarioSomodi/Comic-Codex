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
} from 'native-base';
import placeholderImage from '../../assets/images/Placeholder.png';
import PureCreatorItemView from '../../components/CreatorComponents/PureCreatorItemView';
import {GetEvent} from '../../api/controllers/eventController';

const EventDetails = ({route, navigation}) => {
  const [event, setEvent] = useState(null);

  const getEvent = async () => {
    var response = await GetEvent(route.params.loadFromId);
    setEvent(response);
  };

  useEffect(() => {
    if (route.params.event != null) {
      setEvent(route.params.event);
    }
  }, []);

  useEffect(() => {
    if (route.params.load === true) {
      getEvent();
    }
  }, [route.params.load]);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: event != null ? 'flex-start' : 'center',
        flexGrow: 1,
      }}
      p={2}>
      {event != null ? (
        <VStack mb={10}>
          <HStack justifyContent="center" alignItems="center">
            <Image
              alignSelf="center"
              borderColor="black"
              borderWidth={1}
              borderRadius="md"
              justifyContent="center"
              alignItems="center"
              alt={event.title}
              h={225}
              w={150}
              key={event.id}
              source={
                event.thumbnail === true
                  ? placeholderImage
                  : {uri: event.thumbnail}
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
                {event.title}
              </Text>
              <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              {event.start != 'null' ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      Start
                    </Text>
                    : {event.start}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {event.end != 'null' ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      End
                    </Text>
                    : {event.end}
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
            {event.description}
          </Text>

          {event.charactersAvailable !== 0 ||
          event.storiesAvailable !== 0 ||
          event.comicsAvailable !== 0 ||
          event.seriesAvailable !== 0 ? (
            <View>
              <Divider
                mt={3}
                h={1}
                borderRadius={50}
                backgroundColor="red.800"
              />
              <HStack justifyContent="center" alignItems="center">
                {event.charactersAvailable !== 0 ? (
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
                            id: event.id,
                            name: event.title,
                            type: 'events',
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
                {event.comicsAvailable !== null ? (
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
                            id: event.id,
                            name: event.title,
                            type: 'events',
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
                {event.seriesAvailable !== 0 ? (
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
                            id: event.id,
                            name: event.title,
                            type: 'events',
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
                {event.storiesAvailable !== 0 ? (
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
                pressing the buttons above will bring up this events specified
                item/s.
              </Text>
            </View>
          ) : null}
          {event.creators !== null && event.creators.length > 0 ? (
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
                {event.creators.map((creator, index) => {
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
            accessibilityLabel="Loading series"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading events
          </Heading>
        </Center>
      )}
    </ScrollView>
  );
};

export default EventDetails;
