import React, {useEffect, useState, useRef, useMemo} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import debounce from 'lodash.debounce';
import {View, Input, Icon} from 'native-base';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ComicVM from '../../components/ComicComponents/ComicVM';
import ComicsList from '../../components/ComicComponents/ComicsList';
import ComicsSearchList from '../../components/ComicComponents/ComicsSearchList';
import ComicsOfItemList from '../../components/ComicComponents/ComicsOfItemList';

const ComicsScreen = ({navigation}) => {
  const route = useRoute();

  const [itemComicsView, setItemComicsView] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState({value: '', newSearch: true});
  const [itemInfo, setItemInfo] = useState(null);
  const [currentComic, setCurrentComic] = useState(null);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['0%', '43%'], []);

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

  useFocusEffect(
    React.useCallback(() => {
      return () => bottomSheetRef.current.close();
    }, []),
  );

  const debounceOnChange = debounce(handleSearch, 1000);

  useEffect(() => {
    if (route.params !== undefined) {
      switch (route.params.type) {
        case 'creators':
        case 'series':
        case 'events':
        case 'characters': {
          setItemInfo({
            id: route.params.id,
            name: route.params.name,
            type: route.params.type,
          });
          break;
        }
        default: {
          break;
        }
      }
      setItemComicsView(true);
    } else {
      setItemComicsView(false);
    }
    handleComicInfoSheetClose();
  }, [route]);

  return (
    <View flex={1}>
      {!itemComicsView ? (
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
        {itemComicsView ? (
          <ComicsOfItemList
            handleComicInfoSheetOpen={handleComicInfoSheetOpen}
            itemInfo={itemInfo}
            navigation={navigation}
            setItemComicsView={setItemComicsView}
          />
        ) : searchTrigger ? (
          <ComicsSearchList
            handleComicInfoSheetOpen={handleComicInfoSheetOpen}
            setSearchTrigger={setSearchTrigger}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : (
          <ComicsList
            navigation={navigation}
            handleComicInfoSheetOpen={handleComicInfoSheetOpen}
          />
        )}
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
    </View>
  );
};

export default ComicsScreen;
