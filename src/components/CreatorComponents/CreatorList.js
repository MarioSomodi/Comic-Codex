/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../../utilites/screenOrientation';
import PureCreatorItemView from './PureCreatorItemView';
import {GetCreators} from '../../api/controllers/creatorController';

const CreatorsList = ({navigation}) => {
  const [creators, setCreators] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: true,
  });

  const fetchCreators = async () => {
    var response = await GetCreators(99, offsetAndLoading.offsetNum);
    setCreators(prevCreators =>
      offsetAndLoading.offsetNum === 0
        ? response
        : [...prevCreators, ...response],
    );
  };

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const handleLoadMoreCreators = () => {
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
        <Spinner accessibilityLabel="Loading more creators" color="red.800" />
        <Heading color="red.800" fontSize="sm">
          Loading
        </Heading>
      </Center>
    );
  };

  const renderItem = useCallback(({item}) => {
    return <PureCreatorItemView navigation={navigation} item={item} />;
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (creators.length == 0) {
        fetchCreators();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchCreators();
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {creators.length > 0 && creators[0] !== 'false' ? (
        <FlatList
          onEndReached={handleLoadMoreCreators}
          onEndReachedThreshold={0.5}
          flex={1}
          m={1}
          data={creators}
          ListFooterComponent={renderFooter}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          key={screenOrientation === 'landscape' ? 1 : 2}
        />
      ) : (
        <Center flex={1}>
          <Spinner
            accessibilityLabel="Loading comics"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading creators
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default CreatorsList;
