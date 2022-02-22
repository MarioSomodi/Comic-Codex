import React, {useEffect, useState, useRef, useMemo} from 'react';
import debounce from 'lodash.debounce';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {Icon, View, Input} from 'native-base';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CharacterVM from '../../components/CharacterComponents/CharacterVM';
import CharacterList from '../../components/CharacterComponents/CharacterList';
import CharacterSearchList from '../../components/CharacterComponents/CharacterSearchList';
import CharactersOfItemList from '../../components/CharacterComponents/CharactersOfItemList';

const CharactersScreen = ({navigation}) => {
  const route = useRoute();
  const [itemCharactersView, setItemCharactersView] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);
  const [searchValue, setSearchValue] = useState({value: '', newSearch: true});
  const [searchTrigger, setSearchTrigger] = useState(false);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['0%', '43%'], []);

  const handleCharacterInfoSheetClose = () => {
    bottomSheetRef.current.close();
  };

  const handleCharacterInfoSheetOpen = character => {
    bottomSheetRef.current.expand();
    setCurrentCharacter(character);
  };

  const handleSearch = value => {
    setSearchValue({value: value, newSearch: true});
    setSearchTrigger(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, []),
  );

  const debounceOnChange = debounce(handleSearch, 1000);

  useEffect(() => {
    if (route.params !== undefined) {
      switch (route.params.type) {
        case 'series':
        case 'comics': {
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
      setItemCharactersView(true);
    } else {
      setItemCharactersView(false);
    }
  }, [route]);

  return (
    <View flex={1}>
      {!itemCharactersView ? (
        <Input
          flex={0}
          placeholder="Search characters"
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
        {itemCharactersView ? (
          <CharactersOfItemList
            handleCharacterInfoSheetOpen={handleCharacterInfoSheetOpen}
            itemInfo={itemInfo}
            setItemCharactersView={setItemCharactersView}
            navigation={navigation}
          />
        ) : searchTrigger ? (
          <CharacterSearchList
            handleCharacterInfoSheetOpen={handleCharacterInfoSheetOpen}
            setSearchTrigger={setSearchTrigger}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : (
          <CharacterList
            navigation={navigation}
            handleCharacterInfoSheetOpen={handleCharacterInfoSheetOpen}
          />
        )}
        <BottomSheet
          animateOnMount={true}
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
    </View>
  );
};

export default CharactersScreen;
