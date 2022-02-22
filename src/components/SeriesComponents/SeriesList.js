/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../../utilites/screenOrientation';
import PureSeriesItemView from './PureSeriesItemView';
import {GetSeries} from '../../api/controllers/seriesController';

const SeriesList = ({handleSeriesInfoSheetOpen, navigation}) => {
  const [series, setSeries] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: true,
  });

  const fetchSeries = async () => {
    var response = await GetSeries(99, offsetAndLoading.offsetNum);
    setSeries(prevSeries =>
      offsetAndLoading.offsetNum === 0
        ? response
        : [...prevSeries, ...response],
    );
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

  const handleLoadMoreSeries = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 99, loading: true};
    });
  };

  const renderFooter = () => {
    if (!offsetAndLoading.loading) {
      return null;
    }
    return (
      <Center>
        <Spinner accessibilityLabel="Loading more series" color="red.800" />
        <Heading color="red.800" fontSize="sm">
          Loading
        </Heading>
      </Center>
    );
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

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    fetchSeries();
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {series.length > 0 && series[0] !== 'false' ? (
        <FlatList
          getItemLayout={getItemLayout}
          onEndReached={handleLoadMoreSeries}
          onEndReachedThreshold={0.5}
          flex={3}
          m={1}
          data={series}
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
            Loading series
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default SeriesList;
