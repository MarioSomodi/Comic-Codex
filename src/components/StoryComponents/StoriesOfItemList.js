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
import PureStoryItemView from './PureStoryItemView';
import {GetCharacterStories} from '../../api/controllers/charactersController';
import {GetCreatorsStories} from '../../api/controllers/creatorController';
import {GetEventsStories} from '../../api/controllers/eventController';
import {GetSeriesStories} from '../../api/controllers/seriesController';
import {GetComicsStories} from '../../api/controllers/comicsController';

const StoriesOfItemList = ({itemInfo, setItemStoriesView, navigation}) => {
  const [itemStories, setItemStories] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [endOfResults, setEndOfResults] = useState(true);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });

  const fetchItemStories = async first => {
    var response;
    switch (itemInfo.type) {
      case 'characters': {
        response = await GetCharacterStories(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'creators': {
        response = await GetCreatorsStories(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'events': {
        response = await GetEventsStories(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'series': {
        response = await GetSeriesStories(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'comics': {
        response = await GetComicsStories(
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
      setItemStories(prevItemStories =>
        first ? response : [...prevItemStories, ...response],
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
    return <PureStoryItemView navigation={navigation} item={item} />;
  }, []);

  const renderFooterChar = () => {
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

  const handleLoadMoreItemStories = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 99, loading: true};
    });
  };

  const keyExtractor = useCallback(item => item.id, []);

  const goBackToItemsScreen = () => {
    setItemStoriesView(false);
    switch (itemInfo.type) {
      case 'characters': {
        navigation.navigate('Root', {screen: 'Characters'});
        navigation.navigate('CharacterDetails', {
          loadFromId: itemInfo.id,
          load: true,
        });
        break;
      }
      case 'creators': {
        navigation.navigate('Root', {screen: 'Creators'});
        navigation.navigate('CreatorDetails', {
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
      case 'series': {
        navigation.navigate('Root', {screen: 'Series'});
        navigation.navigate('SeriesDetails', {
          loadFromId: itemInfo.id,
          load: true,
        });
        break;
      }
      case 'comics': {
        navigation.navigate('Root', {screen: 'Comics'});
        navigation.navigate('ComicDetails', {
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

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    if (itemInfo !== null) {
      setItemStories([]);
      setOffsetAndLoad({
        offsetNum: 0,
        loading: true,
      });
      setEndOfResults(false);
      fetchItemStories(true);
    }
  }, [itemInfo]);

  useEffect(() => {
    if (!endOfResults && offsetAndLoading.offsetNum !== 0) {
      fetchItemStories(false);
    }
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {itemStories.length > 0 && itemStories[0] !== 'false' ? (
        <View flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text m={1} flex={1} fontSize={17}>
              Stories of{' '}
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
            onEndReached={handleLoadMoreItemStories}
            onEndReachedThreshold={0.5}
            m={1}
            data={itemStories}
            ListFooterComponent={renderFooterChar}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            key={screenOrientation === 'landscape' ? 1 : 2}
          />
        </View>
      ) : (
        <Center flex={1}>
          <View>
            <Spinner
              accessibilityLabel="Loading series"
              color="red.800"
              size="lg"
            />
            <Heading color="red.800" fontSize="lg">
              Loading {itemInfo.type} stories
            </Heading>
          </View>
        </Center>
      )}
    </View>
  );
};

export default StoriesOfItemList;
