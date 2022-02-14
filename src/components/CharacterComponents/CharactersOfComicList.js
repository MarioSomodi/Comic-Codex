/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Center,
  Spinner,
  Heading,
  HStack,
  Text,
  IconButton,
} from 'native-base';
import {Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isPortrait} from '../../utilites/screenOrientation';
import PureCharacterItemView from './PureCharacterItemView';
import {GetComicsCharacters} from '../../api/controllers/comicsController';

const CharactersOfComicList = ({
  handleCharacterInfoSheetOpen,
  comicInfo,
  setComicsCharactersView,
  navigation,
}) => {
  const [comicsCharacters, setComicsCharacters] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [endOfResultsComics, setEndOfResultsComics] = useState(true);
  const [offsetAndLoadingComics, setOffsetAndLoadComics] = useState({
    offsetNumComics: 0,
    loadingComics: false,
  });

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const fetchComicsCharacters = async first => {
    var response = await GetComicsCharacters(
      99,
      first ? 0 : offsetAndLoadingComics.offsetNumComics,
      comicInfo.id,
    );
    if (typeof response[0] === 'string') {
      setEndOfResultsComics(true);
    } else {
      if (response.length < 99) {
        setEndOfResultsComics(true);
      } else {
        setEndOfResultsComics(false);
      }
      setComicsCharacters(prevComicCharacters =>
        first ? response : [...prevComicCharacters, ...response],
      );
    }
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

  const renderFooterComic = () => {
    if (!offsetAndLoadingComics.loadingComics) {
      return null;
    }
    return endOfResultsComics ? (
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

  const handleLoadMoreComicsCharacters = () => {
    setOffsetAndLoadComics(prevObj => {
      return {offsetNumComics: prevObj.offsetNumChar + 99, loadingComics: true};
    });
  };

  const goBackToComicsScreen = () => {
    setComicsCharactersView(false);
    navigation.navigate('Comics');
  };

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    if (comicInfo !== null) {
      setComicsCharacters([]);
      setOffsetAndLoadComics({
        offsetNumChar: 0,
        loadingComics: true,
      });
      setEndOfResultsComics(false);
      fetchComicsCharacters(true);
    }
  }, [comicInfo]);

  useEffect(() => {
    if (!endOfResultsComics && offsetAndLoadingComics.offsetNumComics !== 0) {
      fetchComicsCharacters(false);
    }
  }, [offsetAndLoadingComics.offsetNumComics]);

  return (
    <View flex={1}>
      {comicsCharacters.length > 0 && comicsCharacters[0] !== 'false' ? (
        <View flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text m={1} flex={1} fontSize={17}>
              Characters of comic:{' '}
              <Text fontSize={17} bold={true}>
                {comicInfo.title}
              </Text>
            </Text>
            <IconButton
              onPress={goBackToComicsScreen}
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
            onEndReached={handleLoadMoreComicsCharacters}
            onEndReachedThreshold={0.5}
            m={1}
            data={comicsCharacters}
            ListFooterComponent={renderFooterComic}
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
              accessibilityLabel="Loading comics characters"
              color="red.800"
              size="lg"
            />
            <Heading color="red.800" fontSize="lg">
              Loading comics characters
            </Heading>
          </View>
        </Center>
      )}
    </View>
  );
};

export default CharactersOfComicList;
