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
import PureEventItemView from './PureEventItemView';
import {GetCharactersEvents} from '../../api/controllers/charactersController';
import {GetCreatorsEvents} from '../../api/controllers/creatorController';
import {GetSeriesEvents} from '../../api/controllers/seriesController';
import {GetComicsEvents} from '../../api/controllers/comicsController';

const EventsOfItemList = ({
  handleEventInfoSheetOpen,
  itemInfo,
  setItemEventsView,
  navigation,
}) => {
  const [itemEvents, setItemEvents] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [endOfResults, setEndOfResults] = useState(true);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });

  const fetchItemEvents = async first => {
    var response;
    switch (itemInfo.type) {
      case 'characters': {
        response = await GetCharactersEvents(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'creators': {
        response = await GetCreatorsEvents(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'comics': {
        response = await GetComicsEvents(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'series': {
        response = await GetSeriesEvents(
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
      setItemEvents(prevItemEvents =>
        first ? response : [...prevItemEvents, ...response],
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
      <PureEventItemView
        handleEventInfoSheetOpen={handleEventInfoSheetOpen}
        item={item}
      />
    );
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

  const handleLoadMoreItemSeries = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 99, loading: true};
    });
  };

  const keyExtractor = useCallback(item => item.id, []);

  const goBackToItemsScreen = () => {
    setItemEventsView(false);
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
      setItemEvents([]);
      setOffsetAndLoad({
        offsetNum: 0,
        loading: true,
      });
      setEndOfResults(false);
      fetchItemEvents(true);
    }
  }, [itemInfo]);

  useEffect(() => {
    if (!endOfResults && offsetAndLoading.offsetNum !== 0) {
      fetchItemEvents(false);
    }
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {itemEvents.length > 0 && itemEvents[0] !== 'false' ? (
        <View flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text m={1} flex={1} fontSize={17}>
              Events of{' '}
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
            onEndReached={handleLoadMoreItemSeries}
            onEndReachedThreshold={0.5}
            m={1}
            data={itemEvents}
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
              accessibilityLabel="Loading series"
              color="red.800"
              size="lg"
            />
            <Heading color="red.800" fontSize="lg">
              Loading {itemInfo.type} events
            </Heading>
          </View>
        </Center>
      )}
    </View>
  );
};

export default EventsOfItemList;
