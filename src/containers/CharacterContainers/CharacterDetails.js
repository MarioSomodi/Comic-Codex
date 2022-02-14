import React from 'react';
import {
  View,
  HStack,
  Image,
  Text,
  VStack,
  Divider,
  Button,
  ScrollView,
} from 'native-base';
import placeholderImage from '../../assets/images/Placeholder.png';

const CharacterDetails = ({navigation, route}) => {
  const {character} = route.params;
  return (
    <ScrollView p={2}>
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
          <Divider
            w={1}
            mx={2}
            orientation="vertical"
            borderRadius={50}
            backgroundColor="red.800"
          />
          <VStack flex={1}>
            <Text m={1} bold={true} fontSize={20}>
              {character.name}
            </Text>
            <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
            <Text m={1} bold={true} fontSize={18}>
              Appears in
            </Text>
            {character.numOfComics !== 0 ? (
              <View>
                <Text m={1} fontSize={16}>
                  <Text bold={true} fontSize={17}>
                    Comics
                  </Text>
                  : {character.numOfComics}
                </Text>
                <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              </View>
            ) : null}
            {character.numOfEvents !== 0 ? (
              <View>
                <Text m={1} fontSize={16}>
                  <Text bold={true} fontSize={17}>
                    Events
                  </Text>
                  : {character.numOfEvents}
                </Text>
                <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              </View>
            ) : null}
            {character.numOfStories !== 0 ? (
              <View>
                <Text m={1} fontSize={16}>
                  <Text bold={true} fontSize={17}>
                    Stories
                  </Text>
                  : {character.numOfStories}
                </Text>
                <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              </View>
            ) : null}
            {character.numOfSeries !== 0 ? (
              <View>
                <Text m={1} fontSize={16}>
                  <Text bold={true} fontSize={17}>
                    Series
                  </Text>
                  : {character.numOfSeries}
                </Text>
                <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              </View>
            ) : null}
          </VStack>
        </HStack>
        <Text m={1} mt={3} fontSize={15}>
          {character.description}
        </Text>
        <Divider h={1} borderRadius={50} backgroundColor="red.800" />
        {character.numOfComics !== 0 ? (
          <Button
            mt={2}
            borderRadius={25}
            bg="red.800"
            _text={{
              fontSize: 'md',
              fontWeight: '500',
            }}
            _pressed={{
              bg: 'red.900',
            }}
            onPress={() =>
              navigation.navigate('Root', {
                screen: 'Comics',
                params: {id: character.id, name: character.name},
              })
            }>
            Check out characters comics
          </Button>
        ) : null}
        {character.numOfEvents !== 0 ? (
          <Button
            mt={2}
            borderRadius={25}
            bg="red.800"
            _text={{
              fontSize: 'md',
              fontWeight: '500',
            }}
            _pressed={{
              bg: 'red.900',
            }}
            // onPress={loginUser}
          >
            Check out characters events
          </Button>
        ) : null}
        {character.numOfStories !== 0 ? (
          <Button
            mt={2}
            borderRadius={25}
            bg="red.800"
            _text={{
              fontSize: 'md',
              fontWeight: '500',
            }}
            _pressed={{
              bg: 'red.900',
            }}
            // onPress={loginUser}
          >
            Check out characters stories
          </Button>
        ) : null}
        {character.numOfSeries !== 0 ? (
          <Button
            mt={2}
            borderRadius={25}
            bg="red.800"
            _text={{
              fontSize: 'md',
              fontWeight: '500',
            }}
            _pressed={{
              bg: 'red.900',
            }}
            // onPress={loginUser}
          >
            Check out characters series
          </Button>
        ) : null}
      </VStack>
    </ScrollView>
  );
};

export default CharacterDetails;
