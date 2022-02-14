import React, {useEffect, useState, useRef, useMemo} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import debounce from 'lodash.debounce';
import {View, Input, Icon} from 'native-base';
import {useRoute} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ComicVM from '../../components/ComicComponents/ComicVM';
import ComicsList from '../../components/ComicComponents/ComicsList';
import ComicsSearchList from '../../components/ComicComponents/ComicsSearchList';
import ComicsOfCharactersList from '../../components/ComicComponents/ComicsOfCharacterList';

const ComicsScreen = ({navigation}) => {
  const route = useRoute();

  const [charactersComicsView, setCharactersComicsView] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState({value: '', newSearch: true});
  const [characterInfo, setCharacterInfo] = useState(null);
  const [currentComic, setCurrentComic] = useState(null);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['43%'], []);

  const handleComicInfoSheetClose = () => {
    bottomSheetRef.current.close();
  };

  const handleComicInfoSheetOpen = comic => {
    bottomSheetRef.current.expand();
    setCurrentComic(comic);
  };

  const handleSearch = value => {
    setSearchValue({value: value, newSearch: true});
    setSearchTrigger(true);
  };

  const debounceOnChange = debounce(handleSearch, 1000);

  useEffect(() => {
    if (route.params !== undefined) {
      setCharacterInfo({id: route.params.id, name: route.params.name});
      setCharactersComicsView(true);
    } else {
      setCharactersComicsView(false);
    }
  }, [route]);

  return (
    <View flex={1}>
      {!charactersComicsView ? (
        <Input
          flex={0}
          placeholder="Search comics"
          backgroundColor="transparent"
          width="100%"
          py="3"
          px="3"
          borderWidth={0}
          _focus={{
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: 'red.800',
          }}
          onChangeText={debounceOnChange}
          fontSize="16"
          InputRightElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="black"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      ) : null}
      <View flex={1} justifyContent="center">
        {charactersComicsView ? (
          <ComicsOfCharactersList
            handleComicInfoSheetOpen={handleComicInfoSheetOpen}
            characterInfo={characterInfo}
            navigation={navigation}
            setCharactersComicsView={setCharactersComicsView}
          />
        ) : searchTrigger ? (
          <ComicsSearchList
            handleComicInfoSheetOpen={handleComicInfoSheetOpen}
            setSearchTrigger={setSearchTrigger}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : (
          <ComicsList handleComicInfoSheetOpen={handleComicInfoSheetOpen} />
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
    </View>
  );
};

export default ComicsScreen;
