/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  FlatList,
  View,
  Center,
  Spinner,
  Heading,
  Text,
  HStack,
  IconButton,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isPortrait} from '../../utilites/screenOrientation';
import PureComicItemView from './PureComicItemView';
import {GetCharactersComics} from '../../api/controllers/charactersController';

const ComicsOfCharactersList = ({
  handleComicInfoSheetOpen,
  characterInfo,
  setCharactersComicsView,
  navigation,
}) => {
  const [characterComics, setCharacterComics] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [endOfResultsChar, setEndOfResultsChar] = useState(true);
  const [offsetAndLoadingChar, setOffsetAndLoadChar] = useState({
    offsetNumChar: 0,
    loadingChar: false,
  });

  const fetchCharacterComics = async first => {
    var response = await GetCharactersComics(
      99,
      first ? 0 : offsetAndLoadingChar.offsetNumChar,
      characterInfo.id,
    );
    if (typeof response[0] === 'string') {
      setEndOfResultsChar(true);
    } else {
      if (response.length < 99) {
        setEndOfResultsChar(true);
      } else {
        setEndOfResultsChar(false);
      }
      setCharacterComics(prevCharacterComics =>
        first ? response : [...prevCharacterComics, ...response],
      );
    }
  };

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
      <PureComicItemView
        handleComicInfoSheetOpen={handleComicInfoSheetOpen}
        item={item}
      />
    );
  }, []);

  const renderFooterChar = () => {
    if (!offsetAndLoadingChar.loadingChar) {
      return null;
    }
    return endOfResultsChar ? (
      <Center>
        <Heading color="red.800" fontSize="sm">
          End of results
        </Heading>
      </Center>
    ) : (
      <Center>
        <Spinner accessibilityLabel="Loading more comics" color="red.800" />
        <Heading color="red.800" fontSize="sm">
          Loading
        </Heading>
      </Center>
    );
  };

  const handleLoadMoreCharacterComics = () => {
    setOffsetAndLoadChar(prevObj => {
      return {offsetNumChar: prevObj.offsetNumChar + 99, loadingChar: true};
    });
  };

  const keyExtractor = useCallback(item => item.id, []);

  const goBackToCharacterScreen = () => {
    setCharactersComicsView(false);
    navigation.navigate('Characters');
  };

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    if (characterInfo !== null) {
      setCharacterComics([]);
      setOffsetAndLoadChar({
        offsetNumChar: 0,
        loadingChar: true,
      });
      setEndOfResultsChar(false);
      fetchCharacterComics(true);
    }
  }, [characterInfo]);

  useEffect(() => {
    if (!endOfResultsChar && offsetAndLoadingChar.offsetNumChar !== 0) {
      fetchCharacterComics(false);
    }
  }, [offsetAndLoadingChar.offsetNumChar]);

  return (
    <View flex={1}>
      {characterComics.length > 0 && characterComics[0] !== 'false' ? (
        <View flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text m={1} flex={1} fontSize={17}>
              Comics of character:{' '}
              <Text fontSize={17} bold={true}>
                {characterInfo.name}
              </Text>
            </Text>
            <IconButton
              onPress={goBackToCharacterScreen}
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
          <FlatList
            getItemLayout={getItemLayout}
            onEndReached={handleLoadMoreCharacterComics}
            onEndReachedThreshold={0.5}
            m={1}
            data={characterComics}
            ListFooterComponent={renderFooterChar}
            renderItem={renderItem}
            numColumns={screenOrientation === 'landscape' ? 6 : 3}
            keyExtractor={keyExtractor}
            key={screenOrientation === 'landscape' ? 1 : 2}
          />
        </View>
      ) : (
        <Center flex={1}>
          <View>
            <Spinner
              accessibilityLabel="Loading characters comics"
              color="red.800"
              size="lg"
            />
            <Heading color="red.800" fontSize="lg">
              Loading characters comics
            </Heading>
          </View>
        </Center>
      )}
    </View>
  );
};

export default ComicsOfCharactersList;
