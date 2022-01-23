import React from 'react';
import {View, Text} from 'native-base';

const ComicDetails = ({route}) => {
  const {comic} = route.params;
  return (
    <View>
      <Text>{comic.title}</Text>
    </View>
  );
};

export default ComicDetails;
