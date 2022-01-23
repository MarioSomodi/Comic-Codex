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
import placeholderImage from '../assets/images/Placeholder.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ComicVM = ({handleComicInfoSheetClose, comic, navigation}) => {
  const getExcerpt = () => {
    var results = comic.description.match(/[^\.!\?]+[\.!\?]+/g);
    var excerpt = '';
    results.forEach(sentance => {
      if (excerpt.length < 100) {
        excerpt += sentance;
      }
    });
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
        <VStack pl={2} flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text bold={true} flex={1} fontSize={15}>
              {comic.title}
            </Text>
            <IconButton
              onPress={handleComicInfoSheetClose}
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
        {comic.issueNumber !== 0 ? (
          <Badge
            mt={2}
            mr={1}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Issue : #{comic.issueNumber}
            </Text>
          </Badge>
        ) : null}
        {comic.numOfCharacters !== 0 ? (
          <Badge
            mt={2}
            mr={1}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Characters : {comic.numOfCharacters}
            </Text>
          </Badge>
        ) : null}
        {comic.pageCount !== 0 ? (
          <Badge
            mt={2}
            borderRadius={30}
            bgColor="red.800"
            alignSelf="center"
            variant="solid">
            <Text color="white" bold={true}>
              Pages : {comic.pageCount}
            </Text>
          </Badge>
        ) : null}
      </HStack>
      <Button
        mt={2}
        onPress={() => navigation.navigate('ComicDetails', {comic: comic})}
        borderRadius={25}
        bg="red.800"
        _pressed={{
          bg: 'red.900',
        }}
        _text={{
          fontSize: 'md',
          fontWeight: '500',
        }}>
        Comic details
      </Button>
    </View>
  );
};

export default ComicVM;
