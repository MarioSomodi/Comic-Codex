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
import {GetSeriesSingle} from '../../api/controllers/seriesController';

const ComicDetails = ({route, navigation}) => {
  const [seriesSingle, setSeriesSingle] = useState(null);

  const getSingleSeries = async () => {
    var response = await GetSeriesSingle(route.params.loadFromId);
    setSeriesSingle(response);
  };

  useEffect(() => {
    if (route.params.seriesSingle != null) {
      setSeriesSingle(route.params.seriesSingle);
    }
  }, []);

  useEffect(() => {
    if (route.params.load === true) {
      getSingleSeries();
    }
  }, [route.params.load]);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: seriesSingle != null ? 'flex-start' : 'center',
        flexGrow: 1,
      }}
      p={2}>
      {seriesSingle != null ? (
        <VStack mb={10}>
          <HStack justifyContent="center" alignItems="center">
            <Image
              alignSelf="center"
              borderColor="black"
              borderWidth={1}
              borderRadius="md"
              justifyContent="center"
              alignItems="center"
              alt={seriesSingle.title}
              h={225}
              w={150}
              key={seriesSingle.id}
              source={
                seriesSingle.thumbnail === true
                  ? placeholderImage
                  : {uri: seriesSingle.thumbnail}
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
                {seriesSingle.title}
              </Text>
              <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              {seriesSingle.startYear != null ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      Start year
                    </Text>
                    : {seriesSingle.startYear}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {seriesSingle.endYear != null ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      End year
                    </Text>
                    : {seriesSingle.endYear}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {seriesSingle.type != null ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      Type
                    </Text>
                    : {seriesSingle.type}
                  </Text>
                  <Divider
                    h={0.5}
                    borderRadius={50}
                    backgroundColor="red.800"
                  />
                </View>
              ) : null}
              {seriesSingle.rating != null ? (
                <View>
                  <Text m={1} fontSize={17}>
                    <Text fontSize={18} bold={true}>
                      Rating
                    </Text>
                    : {seriesSingle.rating}
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
            {seriesSingle.description}
          </Text>

          {seriesSingle.charactersAvailable !== 0 ||
          seriesSingle.storiesAvailable !== 0 ||
          seriesSingle.comicsAvailable !== 0 ||
          seriesSingle.eventsAvailable !== 0 ? (
            <View>
              <Divider
                mt={3}
                h={1}
                borderRadius={50}
                backgroundColor="red.800"
              />
              <HStack justifyContent="center" alignItems="center">
                {seriesSingle.charactersAvailable !== 0 ? (
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
                            id: seriesSingle.id,
                            name: seriesSingle.title,
                            type: 'series',
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
                {seriesSingle.comicsAvailable !== null ? (
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
                            id: seriesSingle.id,
                            name: seriesSingle.title,
                            type: 'series',
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
                {seriesSingle.eventsAvailable !== 0 ? (
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
                            id: seriesSingle.id,
                            name: seriesSingle.title,
                            type: 'series',
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
                {seriesSingle.storiesAvailable !== 0 ? (
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
                            id: seriesSingle.id,
                            name: seriesSingle.title,
                            type: 'series',
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
                pressing the buttons above will bring up this series specified
                item/s.
              </Text>
            </View>
          ) : null}
          {seriesSingle.creators.length > 0 ? (
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
                {seriesSingle.creators.map((creator, index) => {
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
            Loading series
          </Heading>
        </Center>
      )}
    </ScrollView>
  );
};

export default ComicDetails;
