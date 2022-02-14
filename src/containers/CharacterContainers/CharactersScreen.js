import React, {useEffect, useState, useRef, useMemo} from 'react';
import debounce from 'lodash.debounce';
import {Icon, View, Input} from 'native-base';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CharacterVM from '../../components/CharacterComponents/CharacterVM';
import CharacterList from '../../components/CharacterComponents/CharacterList';
import CharacterSearchList from '../../components/CharacterComponents/CharacterSearchList';

const CharactersScreen = ({navigation}) => {
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [searchValue, setSearchValue] = useState({value: '', newSearch: true});
  const [searchTrigger, setSearchTrigger] = useState(false);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['43%'], []);

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

  const debounceOnChange = debounce(handleSearch, 1000);

  return (
    <View flex={1}>
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
      <View flex={1} justifyContent="center">
        {searchTrigger ? (
          <CharacterSearchList
            handleCharacterInfoSheetOpen={handleCharacterInfoSheetOpen}
            setSearchTrigger={setSearchTrigger}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : (
          <CharacterList
            handleCharacterInfoSheetOpen={handleCharacterInfoSheetOpen}
          />
        )}
        <BottomSheet
          animateOnMount={true}
          ref={bottomSheetRef}
          index={-1}
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
