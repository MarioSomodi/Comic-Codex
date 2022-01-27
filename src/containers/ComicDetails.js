import React from 'react';
import {View, HStack, Image, Text, Divider, VStack} from 'native-base';
import placeholderImage from '../assets/images/Placeholder.png';

const ComicDetails = ({route}) => {
  const {comic} = route.params;
  return (
    <View p={2}>
      <VStack>
        <HStack>
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
          <VStack flex={1}>
            <Text m={1} bold={true} fontSize={20}>
              {comic.title}
            </Text>
            <Divider h={0.5} backgroundColor="red.800" />
            {comic.seriesName != null ? (
              <Text m={1} fontSize={17}>
                Series : {comic.seriesName}
              </Text>
            ) : null}
            {comic.issueNumber != 0 ? (
              <Text m={1} fontSize={17}>
                Issue : #{comic.issueNumber}
              </Text>
            ) : null}
            {comic.printPrice != 0 ? (
              <Text m={1} fontSize={17}>
                Price : {comic.printPrice}$
              </Text>
            ) : null}
            {comic.pageCount != 0 ? (
              <Text m={1} fontSize={17}>
                Pages : {comic.pageCount}
              </Text>
            ) : null}
          </VStack>
        </HStack>
        <Text m={1} mt={3} fontSize={15}>
          {comic.description}
        </Text>
        <Divider h={0.5} backgroundColor="red.800" />
      </VStack>
    </View>
  );
};

export default ComicDetails;
