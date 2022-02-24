import React from 'react';
import {
  View,
  Text,
  Button,
  IconButton,
  HStack,
  Image,
  Badge,
  VStack,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import placeholderImage from '../../assets/images/Placeholder.png';

const EventVM = ({handleEventInfoSheetClose, event, navigation}) => {
  const getExcerpt = () => {
    var results = event.description.match(/[^\.!\?]+[\.!\?]+/g);
    var excerpt = '';
    if (results !== null) {
      results.forEach(sentance => {
        if (excerpt.length < 100) {
          excerpt += sentance;
        }
      });
    } else {
      excerpt = event.description;
    }
    return excerpt;
  };
  return (
    <View m={3} justifyContent="space-evenly">
      <HStack>
        <Image
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
            event.thumbnail === true ? placeholderImage : {uri: event.thumbnail}
          }
        />
        <VStack pl={2} flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text bold={true} flex={1} fontSize={15}>
              {event.title}
            </Text>
            <IconButton
              onPress={handleEventInfoSheetClose}
              alignSelf="flex-start"
              size="sm"
              ml={1}
              variant="ghost"
              _pressed={{
                bg: 'white',
                _icon: {
                  color: 'red.600',
                },
              }}
              _icon={{
                as: MaterialIcons,
                name: 'close',
              }}
            />
          </HStack>
          <Text fontSize={13}>{getExcerpt()}</Text>
        </VStack>
      </HStack>
      <HStack>
        {event.comicsAvailable !== 0 ? (
          <Badge
            mt={2}
            mr={1}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Comics : {event.comicsAvailable}
            </Text>
          </Badge>
        ) : null}
        {event.charactersAvailable !== 0 ? (
          <Badge
            mt={2}
            mr={1}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Characters : {event.charactersAvailable}
            </Text>
          </Badge>
        ) : null}
        {event.storiesAvailable !== 0 ? (
          <Badge
            mt={2}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Stories : {event.storiesAvailable}
            </Text>
          </Badge>
        ) : null}
        {event.seriesAvailable !== 0 ? (
          <Badge
            mt={2}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Series : {event.seriesAvailable}
            </Text>
          </Badge>
        ) : null}
      </HStack>
      <Button
        mt={2}
        onPress={() => {
          handleEventInfoSheetClose();
          navigation.navigate('EventDetails', {
            event: event,
            load: false,
          });
        }}
        borderRadius={25}
        bg="red.800"
        _pressed={{
          bg: 'red.900',
        }}
        _text={{
          fontSize: 'md',
          fontWeight: '500',
        }}>
        Event details
      </Button>
    </View>
  );
};

export default EventVM;
