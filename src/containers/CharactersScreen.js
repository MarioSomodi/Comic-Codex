/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import debounce from 'lodash.debounce';
import {GetCharacters} from '../api/controllers/charactersController';
import {
  FlatList,
  Icon,
  View,
  Center,
  Spinner,
  Heading,
  Input,
  Text,
} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../utilites/screenOrientation';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PureCharacterItemView from '../components/PureCharacterItemView';
import CharacterVM from '../components/CharacterVM';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CharactersScreen = ({navigation}) => {
  const [characters, setCharacters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [endOfResults, setEndOfResults] = useState(false);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });
  const [offsetAndLoadingSearch, setOffsetAndLoadSearch] = useState({
    offsetNumSearch: 0,
    loadingSearch: true,
  });
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['43%'], []);

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

  const fetchCharactersSearch = async (value, newSearch) => {
    if (value == null) value = searchValue;
    if (value != null && value.trim().length > 0) {
      if (newSearch) {
        var response = await GetCharacters(99, 0, value);
        setSearchResults(response);
      } else {
        var response = await GetCharacters(
          99,
          offsetAndLoadingSearch.offsetNumSearch,
          value,
        );
        if (typeof response[0] === 'string') {
          setEndOfResults(true);
        } else {
          setEndOfResults(false);
          setSearchResults(prevSearchResults =>
            offsetAndLoadingSearch.offsetNumSearch === 0
              ? response
              : [...prevSearchResults, ...response],
          );
        }
      }
    } else {
      setSearchTrigger(false);
    }
  };

  const handleLoadMoreCharacters = () => {
    setOffsetAndLoad(prevObj => {
      return {
        offsetNum: prevObj.offsetNum + 100,
        loading: true,
      };
    });
  };

  const handleLoadMoreSearchCharacters = () => {
    setOffsetAndLoadSearch(prevObj => {
      return {
        offsetNumSearch: prevObj.offsetNumSearch + 100,
        loadingSearch: true,
      };
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

  const renderFooterSearch = () => {
    if (!offsetAndLoadingSearch.loadingSearch) return null;
    return endOfResults ? (
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

  const handleSearch = value => {
    setSearchResults([]);
    setEndOfResults(false);
    setSearchValue(value);
    setSearchTrigger(true);
    fetchCharactersSearch(value, true);
  };

  const debounceOnChange = debounce(handleSearch, 200);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [offsetAndLoading.offsetNum]);

  useEffect(() => {
    if (!endOfResults) fetchCharactersSearch();
  }, [offsetAndLoadingSearch.offsetNumSearch]);

  return (
    <View flex={1}>
      <Input
        flex={0}
        placeholder="Search characters"
        backgroundColor="transparent"
        width="100%"
        py="3"
        px="3"
        borderWidth={0}
        _focus={{
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: 'red.800',
        }}
        onChangeText={debounceOnChange}
        fontSize="16"
        InputRightElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="black"
            as={<MaterialIcons name="search" />}
          />
        }
      />
      <View flex={1} justifyContent="center">
        {searchTrigger ? (
          searchResults.length > 0 && searchResults[0] != 'false' ? (
            <FlatList
              flex={1}
              getItemLayout={getItemLayout}
              onEndReached={handleLoadMoreSearchCharacters}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooterSearch}
              m={1}
              data={searchResults}
              renderItem={renderItem}
              numColumns={screenOrientation === 'landscape' ? 6 : 3}
              keyExtractor={keyExtractor}
              key={screenOrientation === 'landscape' ? 1 : 2}
            />
          ) : (
            <Center>
              {searchResults[0] == 'false' ? (
                <Heading color="red.800" fontSize="lg">
                  End of results
                </Heading>
              ) : (
                <View>
                  <Spinner
                    accessibilityLabel="Loading characters"
                    color="red.800"
                    size="lg"
                  />
                  <Heading color="red.800" fontSize="lg">
                    Loading characters
                  </Heading>
                </View>
              )}
            </Center>
          )
        ) : characters.length > 0 && characters[0] != 'false' ? (
          <FlatList
            flex={1}
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
              accessibilityLabel="Loading characters"
              color="red.800"
              size="lg"
            />
            <Heading color="red.800" fontSize="lg">
              Loading characters
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
                navigation={navigation}
                character={currentCharacter}
                handleCharacterInfoSheetClose={handleCharacterInfoSheetClose}
              />
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </View>
  );
};

export default CharactersScreen;
