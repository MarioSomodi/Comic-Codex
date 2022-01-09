/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {GetCharacters} from '../api/controllers/charactersController';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../utilites/screenOrientation';
import PureCharacterItemView from '../components/PureCharacterItemView';

const CharactersScreen = () => {
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
    var response = await GetCharacters(24, offsetAndLoading.offsetNum);
    setCharacters(prevCharacters =>
      offsetAndLoading.offsetNum === 0
        ? response
        : [...prevCharacters, ...response],
    );
    console.log(characters);
  };

  const handleLoadMoreCharacters = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 24, loading: true};
    });
  };

  const renderFooter = () => {
    if (!offsetAndLoading.loading) return null;
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
    fetchCharacters();
  }, [offsetAndLoading.offsetNum]);
  return (
    <View flex={1} justifyContent="center">
      {characters.length > 0 ? (
        <FlatList
          onEndReached={handleLoadMoreCharacters}
          onEndReachedThreshold={0.5}
          m={1}
          data={characters}
          ListFooterComponent={renderFooter}
          renderItem={({item}) => {
            return (
              <PureCharacterItemView
                item={item}
                screenOrientation={screenOrientation}
              />
            );
          }}
          numColumns={screenOrientation === 'landscape' ? 4 : 3}
          keyExtractor={item => item.id}
          key={screenOrientation === 'landscape' ? 1 : 2}
        />
      ) : (
        <Center>
          <Spinner
            accessibilityLabel="Loading comics"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default CharactersScreen;
