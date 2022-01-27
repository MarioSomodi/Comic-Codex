/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import debounce from 'lodash.debounce';
import {
  FlatList,
  View,
  Center,
  Spinner,
  Heading,
  Input,
  Icon,
} from 'native-base';
import {GetComics} from '../api/controllers/comicsController';
import {Dimensions} from 'react-native';
import {isPortrait} from '../utilites/screenOrientation';
import PureComicItemView from '../components/PureComicItemView';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ComicVM from '../components/ComicVM';

const ComicsScreen = ({navigation}) => {
  const [comics, setComics] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [endOfResults, setEndOfResults] = useState(false);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: true,
  });
  const [offsetAndLoadingSearch, setOffsetAndLoadSearch] = useState({
    offsetNumSearch: 0,
    loadingSearch: true,
  });
  const [currentComic, setCurrentComic] = useState(null);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['43%'], []);

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const handleComicInfoSheetClose = () => {
    bottomSheetRef.current.close();
  };

  const handleComicInfoSheetOpen = comic => {
    bottomSheetRef.current.expand();
    setCurrentComic(comic);
  };

  const fetchComics = async () => {
    var response = await GetComics(99, offsetAndLoading.offsetNum);
    setComics(prevComics =>
      offsetAndLoading.offsetNum === 0
        ? response
        : [...prevComics, ...response],
    );
  };

  const fetchComicsSearch = async (value, newSearch) => {
    if (value == null) value = searchValue;
    if (value != null && value.trim().length > 0) {
      if (newSearch) {
        var response = await GetComics(99, 0, value);
        setSearchResults(response);
      } else {
        var response = await GetComics(
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

  const handleLoadMoreComics = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 100, loading: true};
    });
  };

  const handleLoadMoreSearchComics = () => {
    setOffsetAndLoadSearch(prevObj => {
      return {
        offsetNumSearch: prevObj.offsetNumSearch + 100,
        loadingSearch: true,
      };
    });
  };

  const renderItem = useCallback(({item}) => {
    return (
      <PureComicItemView
        handleComicInfoSheetOpen={handleComicInfoSheetOpen}
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
    fetchComicsSearch(value, true);
  };

  const debounceOnChange = debounce(handleSearch, 200);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    fetchComics();
  }, [offsetAndLoading.offsetNum]);

  useEffect(() => {
    if (!endOfResults) fetchComicsSearch();
  }, [offsetAndLoadingSearch.offsetNumSearch]);

  return (
    <View flex={1}>
      <Input
        flex={0}
        placeholder="Search comics"
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
              getItemLayout={getItemLayout}
              onEndReached={handleLoadMoreSearchComics}
              onEndReachedThreshold={0.5}
              m={1}
              data={searchResults}
              ListFooterComponent={renderFooterSearch}
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
                    accessibilityLabel="Loading comics"
                    color="red.800"
                    size="lg"
                  />
                  <Heading color="red.800" fontSize="lg">
                    Loading comics
                  </Heading>
                </View>
              )}
            </Center>
          )
        ) : comics.length > 0 && comics[0] != 'false' ? (
          <FlatList
            getItemLayout={getItemLayout}
            onEndReached={handleLoadMoreComics}
            onEndReachedThreshold={0.5}
            m={1}
            data={comics}
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
              Loading comics
            </Heading>
          </Center>
        )}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          handleComponent={null}
          snapPoints={snapPoints}>
          {currentComic && (
            <BottomSheetScrollView>
              <ComicVM
                navigation={navigation}
                comic={currentComic}
                handleComicInfoSheetClose={handleComicInfoSheetClose}
              />
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </View>
  );
};

export default ComicsScreen;
