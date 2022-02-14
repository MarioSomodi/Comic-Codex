/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../../utilites/screenOrientation';
import PureCharacterItemView from './PureCharacterItemView';
import {GetCharacters} from '../../api/controllers/charactersController';

const CharacterList = ({handleCharacterInfoSheetOpen}) => {
  const [characters, setCharacters] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const fetchCharacters = async () => {
    var response = await GetCharacters(99, offsetAndLoading.offsetNum);
    setCharacters(prevCharacters =>
      offsetAndLoading.offsetNum === 0
        ? response
        : [...prevCharacters, ...response],
    );
  };

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

  const handleLoadMoreCharacters = () => {
    setOffsetAndLoad(prevObj => {
      return {
        offsetNum: prevObj.offsetNum + 99,
        loading: true,
      };
    });
  };

  const renderFooter = () => {
    if (!offsetAndLoading.loading) {
      return null;
    }
    return (
      <Center>
        <Spinner accessibilityLabel="Loading more comics" color="red.800" />
        <Heading color="red.800" fontSize="sm">
          Loading
        </Heading>
      </Center>
    );
  };

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {characters.length > 0 && characters[0] != 'false' ? (
        <FlatList
          flex={3}
          getItemLayout={getItemLayout}
          onEndReached={handleLoadMoreCharacters}
          onEndReachedThreshold={0.5}
          m={1}
          data={characters}
          ListFooterComponent={renderFooter}
          renderItem={renderItem}
          numColumns={screenOrientation === 'landscape' ? 6 : 3}
          keyExtractor={keyExtractor}
          key={screenOrientation === 'landscape' ? 1 : 2}
        />
      ) : (
        <Center flex={1}>
          <Spinner
            accessibilityLabel="Loading characters"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading characters
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default CharacterList;
