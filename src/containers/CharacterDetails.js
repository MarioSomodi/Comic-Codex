import React from 'react';
import {View, HStack, Image, Text, VStack, Divider} from 'native-base';
import placeholderImage from '../assets/images/Placeholder.png';

const CharacterDetails = ({route}) => {
  const {character} = route.params;
  return (
    <View p={2}>
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
          <VStack flex={1}>
            <Text m={1} bold={true} fontSize={20}>
              {character.name}
            </Text>
            <Divider h={0.5} backgroundColor="red.800" />
            <Text m={1} bold={true} fontSize={18}>
              Appears in
            </Text>
            {character.numOfComics != 0 ? (
              <Text m={1} fontSize={17}>
                Comics : {character.numOfComics}
              </Text>
            ) : null}
            {character.numOfEvents != 0 ? (
              <Text m={1} fontSize={17}>
                Events : {character.numOfEvents}
              </Text>
            ) : null}
            {character.numOfStories != 0 ? (
              <Text m={1} fontSize={17}>
                Stories : {character.numOfStories}
              </Text>
            ) : null}
            {character.numOfSeries != 0 ? (
              <Text m={1} fontSize={17}>
                Series : {character.numOfSeries}
              </Text>
            ) : null}
          </VStack>
        </HStack>
        <Text m={1} mt={3} fontSize={15}>
          {character.description}
        </Text>
        <Divider h={0.5} backgroundColor="red.800" />
      </VStack>
    </View>
  );
};

export default CharacterDetails;
