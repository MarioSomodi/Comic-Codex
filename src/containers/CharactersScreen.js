/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {GetCharacters} from '../api/controllers/charactersController';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../utilites/screenOrientation';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PureCharacterItemView from '../components/PureCharacterItemView';
import CharacterVM from '../components/CharacterVM';

const CharactersScreen = () => {
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%'], []);

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
  };

  const handleLoadMoreCharacters = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 24, loading: true};
    });
  };

  const handleCharacterInfoSheetClose = () => {
    bottomSheetRef.current.close();
  };

  const handleCharacterInfoSheetOpen = character => {
    bottomSheetRef.current.expand();
    setCurrentCharacter(character);
  };

  const renderItem = useCallback(({item}) => {
    return (
      <PureCharacterItemView
        handleCharacterInfoSheetOpen={handleCharacterInfoSheetOpen}
        item={item}
      />
    );
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

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
      <BottomSheet
        animateOnMount={true}
        ref={bottomSheetRef}
        index={-1}
        handleComponent={null}
        snapPoints={snapPoints}>
        {currentCharacter && (
          <BottomSheetScrollView>
            <CharacterVM
              character={currentCharacter}
              handleCharacterInfoSheetClose={handleCharacterInfoSheetClose}
            />
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    </View>
  );
};

export default CharactersScreen;
