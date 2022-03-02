/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {firebase} from '@react-native-firebase/database';
import {Dimensions} from 'react-native';
import {View, Center, Spinner, Heading, FlatList} from 'native-base';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CharacterVM from '../../components/CharacterComponents/CharacterVM';
import {isPortrait} from '../../utilites/screenOrientation';
import PureCharacterItemView from '../CharacterComponents/PureCharacterItemView';

const FavoriteCharacters = ({navigation, user}) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState(null);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [currentCharacter, setCurrentCharacter] = useState(null);

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['0%', '43%'], []);

  const handleCharacterInfoSheetClose = () => {
    bottomSheetRef.current.collapse();
  };

  const handleCharacterInfoSheetOpen = character => {
    bottomSheetRef.current.expand();
    setCurrentCharacter(character);
  };

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const getFavoriteCharacters = async () => {
    try {
      const database = firebase
        .app()
        .database(
          'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
        );
      database.ref('/characters/' + user.uid).on('value', snapshot => {
        var favoriteCharactersDB = snapshot.val();
        if (favoriteCharactersDB !== null) {
          favoriteCharactersDB = Object.values(favoriteCharactersDB);
          var fCharacters = [];
          favoriteCharactersDB.forEach(usersFavoriteCharacter => {
            fCharacters.push(usersFavoriteCharacter);
          });
          setFavoriteCharacters(fCharacters);
        } else {
          setFavoriteCharacters([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = useCallback(({item}) => {
    return (
      <PureCharacterItemView
        handleCharacterInfoSheetOpen={handleCharacterInfoSheetOpen}
        item={item}
      />
    );
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    getFavoriteCharacters();
  }, []);

  return favoriteCharacters !== null ? (
    favoriteCharacters.length !== 0 ? (
      <View flex={1} justifyContent="center">
        <FlatList
          getItemLayout={getItemLayout}
          flex={3}
          m={1}
          data={favoriteCharacters}
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
          {currentCharacter && (
            <BottomSheetScrollView>
              <CharacterVM
                navigation={navigation}
                character={currentCharacter}
                handleCharacterInfoSheetClose={handleCharacterInfoSheetClose}
              />
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    ) : (
      <Center flex={1}>
        <Heading color="red.800" fontSize="lg">
          You have not favorited any characters yet.
        </Heading>
      </Center>
    )
  ) : (
    <Center flex={1}>
      <Spinner accessibilityLabel="Loading" color="red.800" size="lg" />
      <Heading color="red.800" fontSize="lg">
        Loading your favorite characters
      </Heading>
    </Center>
  );
};

export default FavoriteCharacters;
