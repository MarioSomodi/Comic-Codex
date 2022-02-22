/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../../utilites/screenOrientation';
import PureSeriesItemView from './PureSeriesItemView';
import {GetSeries} from '../../api/controllers/seriesController';

const SeriesSearchList = ({
  handleSeriesInfoSheetOpen,
  setSearchTrigger,
  searchValue,
  setSearchValue,
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [endOfResults, setEndOfResults] = useState(false);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [offsetAndLoadingSearch, setOffsetAndLoadSearch] = useState({
    offsetNumSearch: 0,
    loadingSearch: true,
  });

  const fetchSeriesSearch = async () => {
    if (searchValue.value != null && searchValue.value.trim().length > 0) {
      if (searchValue.newSearch) {
        var response = await GetSeries(99, 0, searchValue.value);
        if (typeof response[0] === 'string') {
          setEndOfResults(true);
        } else {
          setSearchValue({value: searchValue.value, newSearch: false});
          setSearchResults(response);
          setEndOfResults(false);
        }
      } else {
        var response = await GetSeries(
          99,
          offsetAndLoadingSearch.offsetNumSearch,
          searchValue.value,
        );
        if (typeof response[0] === 'string') {
          setEndOfResults(true);
        } else {
          if (response.length < 99) {
            setEndOfResults(true);
          } else {
            setEndOfResults(false);
          }
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

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const handleLoadMoreSearchSeries = () => {
    setOffsetAndLoadSearch(prevObj => {
      return {
        offsetNumSearch: prevObj.offsetNumSearch + 99,
        loadingSearch: true,
      };
    });
  };

  const renderItem = useCallback(({item}) => {
    return (
      <PureSeriesItemView
        handleSeriesInfoSheetOpen={handleSeriesInfoSheetOpen}
        item={item}
      />
    );
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  const renderFooterSearch = () => {
    if (!offsetAndLoadingSearch.loadingSearch) {
      return null;
    }
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

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    setSearchResults([]);
    setEndOfResults(false);
    setOffsetAndLoadSearch({offsetNumSearch: 0, loadingSearch: true});
    fetchSeriesSearch();
  }, [searchValue]);

  useEffect(() => {
    if (
      !endOfResults &&
      !searchValue.newSearch &&
      offsetAndLoadingSearch.offsetNumSearch !== 0
    ) {
      fetchSeriesSearch();
    }
  }, [offsetAndLoadingSearch.offsetNumSearch]);

  return (
    <View flex={1}>
      {searchResults.length > 0 && searchResults[0] !== 'false' ? (
        <FlatList
          getItemLayout={getItemLayout}
          onEndReached={handleLoadMoreSearchSeries}
          onEndReachedThreshold={0.5}
          m={1}
          flex={3}
          data={searchResults}
          ListFooterComponent={renderFooterSearch}
          renderItem={renderItem}
          numColumns={screenOrientation === 'landscape' ? 6 : 3}
          keyExtractor={keyExtractor}
          key={screenOrientation === 'landscape' ? 1 : 2}
        />
      ) : (
        <Center flex={1}>
          {endOfResults ? (
            <Heading color="red.800" fontSize="lg">
              No results found
            </Heading>
          ) : (
            <View>
              <Spinner
                accessibilityLabel="Loading comics"
                color="red.800"
                size="lg"
              />
              <Heading color="red.800" fontSize="lg">
                Loading series
              </Heading>
            </View>
          )}
        </Center>
      )}
    </View>
  );
};

export default SeriesSearchList;
