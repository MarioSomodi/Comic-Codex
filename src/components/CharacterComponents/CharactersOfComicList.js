/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../../utilites/screenOrientation';
import PureCharacterItemView from './PureCharacterItemView';
import {GetCharacters} from '../../api/controllers/characterController';

const CharactersOfComicList = ({handleCharacterInfoSheetOpen}) => {
  const [screenOrientation, setScreenOrientation] = useState(null);

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const renderItem = useCallback(({item}) => {
    return (
      <PureCharacterItemView
        handleCharacterInfoSheetOpen={handleCharacterInfoSheetOpen}
        item={item}
      />
    );
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  return <View flex={1}></View>;
};

export default CharactersOfComicList;
