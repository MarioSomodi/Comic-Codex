import React from 'react';
import {View, Text} from 'native-base';

const CharacterDetails = ({route}) => {
  const {character} = route.params;
  return (
    <View>
      <Text>{character.name}</Text>
    </View>
  );
};

export default CharacterDetails;
