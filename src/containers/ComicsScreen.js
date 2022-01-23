/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {GetComics} from '../api/controllers/comicsController';
import {Dimensions} from 'react-native';
import {isPortrait} from '../utilites/screenOrientation';
import PureComicItemView from '../components/PureComicItemView';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ComicVM from '../components/ComicVM';

const ComicsScreen = ({navigation}) => {
  const [comics, setComics] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });
  const [currentComic, setCurrentComic] = useState(null);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%'], []);

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const handleComicInfoSheetClose = () => {
    bottomSheetRef.current.close();
  };

  const handleComicInfoSheetOpen = comic => {
    bottomSheetRef.current.expand();
    setCurrentComic(comic);
  };

  const fetchComics = async () => {
    var response = await GetComics(24, offsetAndLoading.offsetNum);
    setComics(prevComics =>
      offsetAndLoading.offsetNum === 0
        ? response
        : [...prevComics, ...response],
    );
  };

  const handleLoadMoreComics = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 24, loading: true};
    });
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

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const renderFooter = () => {
    if (!offsetAndLoading.loading) return null;
    return (
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
    fetchComics();
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1} justifyContent="center">
      {comics.length > 0 ? (
        <FlatList
          getItemLayout={getItemLayout}
          onEndReached={handleLoadMoreComics}
          onEndReachedThreshold={0.5}
          m={1}
          data={comics}
          ListFooterComponent={renderFooter}
          renderItem={renderItem}
          numColumns={screenOrientation === 'landscape' ? 6 : 3}
          keyExtractor={keyExtractor}
          key={screenOrientation === 'landscape' ? 1 : 2}
        />
      ) : (
        <Center>
          <Spinner
            accessibilityLabel="Loading comics"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading
          </Heading>
        </Center>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        handleComponent={null}
        snapPoints={snapPoints}>
        {currentComic && (
          <BottomSheetScrollView>
            <ComicVM
              navigation={navigation}
              comic={currentComic}
              handleComicInfoSheetClose={handleComicInfoSheetClose}
            />
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    </View>
  );
};

export default ComicsScreen;
