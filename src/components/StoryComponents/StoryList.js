/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../../utilites/screenOrientation';
import PureStoryItemView from './PureStoryItemView';
import {GetStories} from '../../api/controllers/storiesController';

const StoryList = ({navigation}) => {
  const [stories, setStories] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: true,
  });

  const fetchStories = async () => {
    var response = await GetStories(99, offsetAndLoading.offsetNum);
    setStories(prevStories =>
      offsetAndLoading.offsetNum === 0
        ? response
        : [...prevStories, ...response],
    );
  };

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const handleLoadMoreStories = () => {
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
    return <PureStoryItemView navigation={navigation} item={item} />;
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    fetchStories();
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {stories.length > 0 && stories[0] !== 'false' ? (
        <FlatList
          onEndReached={handleLoadMoreStories}
          onEndReachedThreshold={0.5}
          flex={1}
          m={1}
          data={stories}
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
            Loading stories
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default StoryList;
