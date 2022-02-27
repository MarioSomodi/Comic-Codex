/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {firebase} from '@react-native-firebase/database';
import {Dimensions} from 'react-native';
import {View, Center, Spinner, Heading, FlatList} from 'native-base';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PureSeriesItemView from '../SeriesComponents/PureSeriesItemView';
import SeriesVM from '../../components/SeriesComponents/SeriesVM';
import {isPortrait} from '../../utilites/screenOrientation';

const FavoriteSeries = ({navigation, user}) => {
  const [favoriteSeries, setFavoriteSeries] = useState(null);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [currentSeries, setCurrentSeries] = useState(null);

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['0%', '43%'], []);

  const handleSeriesInfoSheetClose = () => {
    bottomSheetRef.current.collapse();
  };

  const handleSeriesInfoSheetOpen = series => {
    bottomSheetRef.current.expand();
    setCurrentSeries(series);
  };

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const getFavoriteSeries = async () => {
    try {
      const database = firebase
        .app()
        .database(
          'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
        );
      var DB = await database.ref('/series').on('value', snapshot => {
        var favoriteSeriesDB = snapshot.val();
        favoriteSeriesDB.shift();
        if (favoriteSeriesDB !== undefined && favoriteSeriesDB.length > 0) {
          favoriteSeriesDB.forEach(usersFavoriteSeries => {
            if (usersFavoriteSeries.userUID === user.uid) {
              var fSeries = [];
              usersFavoriteSeries.favoriteSeries.forEach(s => {
                fSeries.push(s);
              });
              setFavoriteSeries(fSeries);
            }
          });
        } else {
          setFavoriteSeries([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
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
    getFavoriteSeries();
  }, []);

  return favoriteSeries !== null ? (
    favoriteSeries.length !== 0 ? (
      <View flex={1} justifyContent="center">
        <FlatList
          getItemLayout={getItemLayout}
          flex={3}
          m={1}
          data={favoriteSeries}
          renderItem={renderItem}
          numColumns={screenOrientation === 'landscape' ? 6 : 3}
          keyExtractor={keyExtractor}
          key={screenOrientation === 'landscape' ? 1 : 2}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          handleComponent={null}
          snapPoints={snapPoints}>
          {currentSeries && (
            <BottomSheetScrollView>
              <SeriesVM
                navigation={navigation}
                series={currentSeries}
                handleSeriesInfoSheetClose={handleSeriesInfoSheetClose}
              />
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    ) : (
      <Center flex={1}>
        <Heading color="red.800" fontSize="lg">
          You have not favorited any series yet.
        </Heading>
      </Center>
    )
  ) : (
    <Center flex={1}>
      <Spinner accessibilityLabel="Loading series" color="red.800" size="lg" />
      <Heading color="red.800" fontSize="lg">
        Loading your favorite series
      </Heading>
    </Center>
  );
};

export default FavoriteSeries;
