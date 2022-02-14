import React from 'react';
import {
  View,
  Text,
  IconButton,
  Badge,
  Button,
  HStack,
  Image,
  VStack,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import placeholderImage from '../../assets/images/Placeholder.png';

const CharacterVM = ({
  handleCharacterInfoSheetClose,
  character,
  navigation,
}) => {
  const getExcerpt = () => {
    var results = character.description.match(/[^\.!\?]+[\.!\?]+/g);
    var excerpt = '';
    results.forEach(sentance => {
      if (excerpt.length < 100) {
        excerpt += sentance;
      }
    });
    return excerpt;
  };
  return (
    <View m={3}>
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
        <VStack pl={2} flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text bold={true} flex={1} fontSize={15}>
              {character.name}
            </Text>
            <IconButton
              onPress={handleCharacterInfoSheetClose}
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
        {character.numOfComics !== 0 ? (
          <Badge
            mt={2}
            mr={1}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Comics : #{character.numOfComics}
            </Text>
          </Badge>
        ) : null}
        {character.numOfEvents !== 0 ? (
          <Badge
            mt={2}
            mr={1}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Events : {character.numOfEvents}
            </Text>
          </Badge>
        ) : null}
        {character.numOfStories !== 0 ? (
          <Badge
            mt={2}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Stories : {character.numOfStories}
            </Text>
          </Badge>
        ) : null}
      </HStack>
      <Button
        mt={2}
        onPress={() =>
          navigation.navigate('CharacterDetails', {character: character})
        }
        borderRadius={25}
        bg="red.800"
        _pressed={{
          bg: 'red.900',
        }}
        _text={{
          fontSize: 'md',
          fontWeight: '500',
        }}>
        Character details
      </Button>
    </View>
  );
};

export default CharacterVM;
