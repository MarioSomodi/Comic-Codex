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
import PureSeriesItemView from './PureSeriesItemView';
import {GetCharactersSeries} from '../../api/controllers/charactersController';
import {GetCreatorsSeries} from '../../api/controllers/creatorController';
import {GetEventsSeries} from '../../api/controllers/eventController';

const SeriesOfItemList = ({
  handleSeriesInfoSheetOpen,
  itemInfo,
  setItemSeriesView,
  navigation,
}) => {
  const [itemSeries, setItemSeries] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [endOfResults, setEndOfResults] = useState(true);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });

  const fetchItemSeries = async first => {
    var response;
    switch (itemInfo.type) {
      case 'characters': {
        response = await GetCharactersSeries(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'creators': {
        response = await GetCreatorsSeries(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'events': {
        response = await GetEventsSeries(
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
      setItemSeries(prevItemSeries =>
        first ? response : [...prevItemSeries, ...response],
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
      <PureSeriesItemView
        handleSeriesInfoSheetOpen={handleSeriesInfoSheetOpen}
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
    setItemSeriesView(false);
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
      setItemSeries([]);
      setOffsetAndLoad({
        offsetNum: 0,
        loading: true,
      });
      setEndOfResults(false);
      fetchItemSeries(true);
    }
  }, [itemInfo]);

  useEffect(() => {
    if (!endOfResults && offsetAndLoading.offsetNum !== 0) {
      fetchItemSeries(false);
    }
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {itemSeries.length > 0 && itemSeries[0] !== 'false' ? (
        <View flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text m={1} flex={1} fontSize={17}>
              Series of{' '}
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
            data={itemSeries}
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
              Loading {itemInfo.type} series
            </Heading>
          </View>
        </Center>
      )}
    </View>
  );
};

export default SeriesOfItemList;
