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

const SeriesVM = ({handleSeriesInfoSheetClose, series, navigation}) => {
  const getExcerpt = () => {
    var results = series.description.match(/[^\.!\?]+[\.!\?]+/g);
    var excerpt = '';
    if (results !== null) {
      results.forEach(sentance => {
        if (excerpt.length < 100) {
          excerpt += sentance;
        }
      });
    } else {
      excerpt = series.description;
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
          alt={series.title}
          h={225}
          w={150}
          key={series.id}
          source={
            series.thumbnail === true
              ? placeholderImage
              : {uri: series.thumbnail}
          }
        />
        <VStack pl={2} flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text bold={true} flex={1} fontSize={15}>
              {series.title}
            </Text>
            <IconButton
              onPress={handleSeriesInfoSheetClose}
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
        {series.comicsAvailable !== 0 ? (
          <Badge
            mt={2}
            mr={1}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Comics : {series.comicsAvailable}
            </Text>
          </Badge>
        ) : null}
        {series.charactersAvailable !== 0 ? (
          <Badge
            mt={2}
            mr={1}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Characters : {series.charactersAvailable}
            </Text>
          </Badge>
        ) : null}
        {series.storiesAvailable !== 0 ? (
          <Badge
            mt={2}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Stories : {series.storiesAvailable}
            </Text>
          </Badge>
        ) : null}
        {series.eventsAvailable !== 0 ? (
          <Badge
            mt={2}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Events : {series.eventsAvailable}
            </Text>
          </Badge>
        ) : null}
      </HStack>
      <Button
        mt={2}
        onPress={() => {
          handleSeriesInfoSheetClose();
          navigation.navigate('SeriesDetails', {
            seriesSingle: series,
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
        Series details
      </Button>
    </View>
  );
};

export default SeriesVM;
