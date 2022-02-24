/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../../utilites/screenOrientation';
import PureEventItemView from './PureEventItemView';
import {GetEvents} from '../../api/controllers/eventController';

const EventList = ({handleEventInfoSheetOpen, navigation}) => {
  const [events, setEvents] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [endOfResults, setEndOfResults] = useState(false);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: true,
  });

  const fetchEvents = async () => {
    var response = await GetEvents(99, offsetAndLoading.offsetNum);
    if (typeof response[0] === 'string' || response.length < 99) {
      setEndOfResults(true);
    }
    if (typeof response[0] !== 'string') {
      setEvents(prevEvents =>
        offsetAndLoading.offsetNum === 0
          ? response
          : [...prevEvents, ...response],
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

  const handleLoadMoreEvents = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 99, loading: true};
    });
  };

  const renderFooter = () => {
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
        <Spinner accessibilityLabel="Loading more comics" color="red.800" />
        <Heading color="red.800" fontSize="sm">
          Loading
        </Heading>
      </Center>
    );
  };

  const renderItem = useCallback(({item}) => {
    return (
      <PureEventItemView
        handleEventInfoSheetOpen={handleEventInfoSheetOpen}
        item={item}
      />
    );
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {events.length > 0 && events[0] !== 'false' ? (
        <FlatList
          getItemLayout={getItemLayout}
          onEndReached={handleLoadMoreEvents}
          onEndReachedThreshold={0.5}
          flex={3}
          m={1}
          data={events}
          ListFooterComponent={renderFooter}
          renderItem={renderItem}
          numColumns={screenOrientation === 'landscape' ? 6 : 3}
          keyExtractor={keyExtractor}
          key={screenOrientation === 'landscape' ? 1 : 2}
        />
      ) : (
        <Center flex={1}>
          <Spinner
            accessibilityLabel="Loading series"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading events
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default EventList;
