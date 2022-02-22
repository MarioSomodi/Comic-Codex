/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {Dimensions} from 'react-native';
import {isPortrait} from '../../utilites/screenOrientation';
import PureComicItemView from './PureComicItemView';
import {GetComics} from '../../api/controllers/comicsController';

const ComicsList = ({handleComicInfoSheetOpen, navigation}) => {
  const [comics, setComics] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: true,
  });

  const fetchComics = async () => {
    var response = await GetComics(99, offsetAndLoading.offsetNum);
    setComics(prevComics =>
      offsetAndLoading.offsetNum === 0
        ? response
        : [...prevComics, ...response],
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

  const handleLoadMoreComics = () => {
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
        <Spinner accessibilityLabel="Loading more comics" color="red.800" />
        <Heading color="red.800" fontSize="sm">
          Loading
        </Heading>
      </Center>
    );
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

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (comics.length == 0) {
        fetchComics();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchComics();
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {comics.length > 0 && comics[0] !== 'false' ? (
        <FlatList
          getItemLayout={getItemLayout}
          onEndReached={handleLoadMoreComics}
          onEndReachedThreshold={0.5}
          flex={3}
          m={1}
          data={comics}
          ListFooterComponent={renderFooter}
          renderItem={renderItem}
          numColumns={screenOrientation === 'landscape' ? 6 : 3}
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
            Loading comics
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default ComicsList;
