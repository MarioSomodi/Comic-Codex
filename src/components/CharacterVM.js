import React from 'react';
import {View, Text, IconButton, HStack, Image, VStack} from 'native-base';
import placeholderImage from '../assets/images/Placeholder.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CharacterVM = ({handleCharacterInfoSheetClose, character}) => {
  const getExcerpt = () => {
    var results = character.description.match(/[^\.!\?]+[\.!\?]+/g);
    var excerpt = '';
    results.forEach(sentance => {
      if (excerpt.length < 200) {
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
    </View>
  );
};

export default CharacterVM;
