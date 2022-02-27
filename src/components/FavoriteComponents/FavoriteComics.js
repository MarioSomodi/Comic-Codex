/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {firebase} from '@react-native-firebase/database';
import {Dimensions} from 'react-native';
import {View, Center, Spinner, Heading, FlatList} from 'native-base';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PureComicItemView from '../ComicComponents/PureComicItemView';
import ComicVM from '../../components/ComicComponents/ComicVM';
import {isPortrait} from '../../utilites/screenOrientation';

const FavoriteComics = ({navigation, user}) => {
  const [favoriteComics, setFavoriteComics] = useState(null);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [currentComic, setCurrentComic] = useState(null);

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['0%', '43%'], []);

  const handleComicInfoSheetClose = () => {
    bottomSheetRef.current.collapse();
  };

  const handleComicInfoSheetOpen = comic => {
    bottomSheetRef.current.expand();
    setCurrentComic(comic);
  };

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const getFavoriteComics = async () => {
    try {
      const database = firebase
        .app()
        .database(
          'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
        );
      var DB = await database.ref('/comics').on('value', snapshot => {
        var favoriteComicsDB = snapshot.val();
        favoriteComicsDB.shift();
        if (favoriteComicsDB !== undefined && favoriteComicsDB.length > 0) {
          favoriteComicsDB.forEach(usersFavoriteComics => {
            if (usersFavoriteComics.userUID === user.uid) {
              var fComics = [];
              usersFavoriteComics.favoriteComics.forEach(favoriteComic => {
                fComics.push(favoriteComic);
              });
              setFavoriteComics(fComics);
            }
          });
        } else {
          setFavoriteComics([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
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
    getFavoriteComics();
  }, []);

  return favoriteComics !== null ? (
    favoriteComics.length !== 0 ? (
      <View flex={1} justifyContent="center">
        <FlatList
          getItemLayout={getItemLayout}
          flex={3}
          m={1}
          data={favoriteComics}
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
    ) : (
      <Center flex={1}>
        <Heading color="red.800" fontSize="lg">
          You have not favorited any comics yet.
        </Heading>
      </Center>
    )
  ) : (
    <Center flex={1}>
      <Spinner accessibilityLabel="Loading comics" color="red.800" size="lg" />
      <Heading color="red.800" fontSize="lg">
        Loading your favorite comics
      </Heading>
    </Center>
  );
};

export default FavoriteComics;
