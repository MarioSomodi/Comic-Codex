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
import {GetSeriesCharacters} from '../../api/controllers/seriesController';
import {GetEventsCharacters} from '../../api/controllers/eventController';
import {GetStoriesCharacters} from '../../api/controllers/storiesController';

const CharactersOfItemList = ({
  handleCharacterInfoSheetOpen,
  itemInfo,
  setItemCharactersView,
  navigation,
}) => {
  const [itemCharacters, setItemCharacters] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [endOfResults, setEndOfResults] = useState(true);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const fetchItemsCharacters = async first => {
    var response = null;
    switch (itemInfo.type) {
      case 'comics': {
        response = await GetComicsCharacters(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'series': {
        response = await GetSeriesCharacters(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'events': {
        response = await GetEventsCharacters(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'stories': {
        response = await GetStoriesCharacters(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      default: {
        break;
      }
    }
    if (typeof response[0] === 'string') {
      setEndOfResults(true);
    } else {
      if (response.length < 99) {
        setEndOfResults(true);
      } else {
        setEndOfResults(false);
      }
      setItemCharacters(prevItemCharacters =>
        first ? response : [...prevItemCharacters, ...response],
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
    if (!offsetAndLoading.loading) {
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
        <Spinner accessibilityLabel="Loading more" color="red.800" />
        <Heading color="red.800" fontSize="sm">
          Loading
        </Heading>
      </Center>
    );
  };

  const handleLoadMoreItemCharacters = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 99, loading: true};
    });
  };

  const goBackToItemsScreen = () => {
    setItemCharactersView(false);
    switch (itemInfo.type) {
      case 'comics': {
        navigation.navigate('Root', {screen: 'Comics'});
        navigation.navigate('ComicDetails', {
          loadFromId: itemInfo.id,
          load: true,
        });
        break;
      }
      case 'stories': {
        navigation.navigate('Root', {screen: 'Stories'});
        navigation.navigate('StoryDetails', {
          loadFromId: itemInfo.id,
          load: true,
        });
        break;
      }
      case 'series': {
        navigation.navigate('Root', {screen: 'Series'});
        navigation.navigate('SeriesDetails', {
          loadFromId: itemInfo.id,
          load: true,
        });
        break;
      }
      case 'events': {
        navigation.navigate('Root', {screen: 'Events'});
        navigation.navigate('EventDetails', {
          loadFromId: itemInfo.id,
          load: true,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    if (itemInfo !== null) {
      setItemCharacters([]);
      setOffsetAndLoad({
        offsetNum: 0,
        loading: true,
      });
      setEndOfResults(false);
      fetchItemsCharacters(true);
    }
  }, [itemInfo]);

  useEffect(() => {
    if (!endOfResults && offsetAndLoading.offsetNum !== 0) {
      fetchItemsCharacters(false);
    }
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {itemCharacters.length > 0 && itemCharacters[0] !== 'false' ? (
        <View flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text m={1} flex={1} fontSize={17}>
              Characters of{' '}
              {itemInfo.type !== 'series'
                ? itemInfo.type.substring(0, itemInfo.type.length - 1)
                : itemInfo.type}
              :{' '}
              <Text fontSize={17} bold={true}>
                {itemInfo.name}
              </Text>
            </Text>
            <IconButton
              onPress={goBackToItemsScreen}
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
            onEndReached={handleLoadMoreItemCharacters}
            onEndReachedThreshold={0.5}
            m={1}
            data={itemCharacters}
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
              accessibilityLabel="Loading characters"
              color="red.800"
              size="lg"
            />
            <Heading color="red.800" fontSize="lg">
              Loading {itemInfo.type} characters
            </Heading>
          </View>
        </Center>
      )}
    </View>
  );
};

export default CharactersOfItemList;
