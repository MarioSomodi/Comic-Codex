import React from 'react';
import {
  View,
  HStack,
  Image,
  Text,
  Divider,
  VStack,
  ScrollView,
  Button,
} from 'native-base';
import placeholderImage from '../../assets/images/Placeholder.png';

const ComicDetails = ({route, navigation}) => {
  const {comic} = route.params;
  return (
    <ScrollView p={2}>
      <VStack>
        <HStack justifyContent="center" alignItems="center">
          <Image
            alignSelf="center"
            borderColor="black"
            borderWidth={1}
            borderRadius="md"
            justifyContent="center"
            alignItems="center"
            alt={comic.title}
            h={225}
            w={150}
            key={comic.id}
            source={
              comic.thumbnailUrl === true
                ? placeholderImage
                : {uri: comic.thumbnailUrl}
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
              {comic.title}
            </Text>
            <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
            {comic.seriesName != null ? (
              <View>
                <Text m={1} fontSize={17}>
                  <Text fontSize={18} bold={true}>
                    Series
                  </Text>
                  : {comic.seriesName}
                </Text>
                <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              </View>
            ) : null}
            {comic.issueNumber !== 0 ? (
              <View>
                <Text m={1} fontSize={17}>
                  <Text fontSize={18} bold={true}>
                    Issue
                  </Text>
                  : #{comic.issueNumber}
                </Text>
                <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              </View>
            ) : null}
            {comic.printPrice !== 0 ? (
              <View>
                <Text m={1} fontSize={17}>
                  <Text fontSize={18} bold={true}>
                    Price
                  </Text>
                  : {comic.printPrice}$
                </Text>
                <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              </View>
            ) : null}
            {comic.pageCount !== 0 ? (
              <View>
                <Text m={1} fontSize={17}>
                  <Text fontSize={18} bold={true}>
                    Pages
                  </Text>
                  : {comic.pageCount}
                </Text>
                <Divider h={0.5} borderRadius={50} backgroundColor="red.800" />
              </View>
            ) : null}
          </VStack>
        </HStack>
        <Text m={1} mt={3} fontSize={15}>
          {comic.description}
        </Text>
        <Divider mt={3} h={1} borderRadius={50} backgroundColor="red.800" />
        <VStack>
          {comic.numOfCharacters !== 0 ? (
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
                  screen: 'Characters',
                  params: {id: comic.id, title: comic.title},
                })
              }>
              Check out comics characters
            </Button>
          ) : null}
          {comic.numOfCreators !== 0 ? (
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
              // onPress={() =>
              //   navigation.navigate('Root', {
              //     screen: 'Characters',
              //     params: {id: comic.id, title: comic.title},
              //   })
              // }
            >
              Check out comics creators
            </Button>
          ) : null}
          {comic.numOfEvents !== 0 ? (
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
              // onPress={() =>
              //   navigation.navigate('Root', {
              //     screen: 'Characters',
              //     params: {id: comic.id, title: comic.title},
              //   })
              // }
            >
              Check out comics events
            </Button>
          ) : null}
          {comic.numOfStories !== 0 ? (
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
              // onPress={() =>
              //   navigation.navigate('Root', {
              //     screen: 'Characters',
              //     params: {id: comic.id, title: comic.title},
              //   })
              // }
            >
              Check out comics stories
            </Button>
          ) : null}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default ComicDetails;
