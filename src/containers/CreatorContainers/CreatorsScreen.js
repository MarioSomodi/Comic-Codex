import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import debounce from 'lodash.debounce';
import {View, Input, Icon} from 'native-base';
import CreatorsList from '../../components/CreatorComponents/CreatorList';
import CreatorsSearchList from '../../components/CreatorComponents/CreatorSearchList';

const CreatorsScreen = ({navigation}) => {
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState({value: '', newSearch: true});

  const handleSearch = value => {
    setSearchValue({value: value, newSearch: true});
    setSearchTrigger(true);
  };

  const debounceOnChange = debounce(handleSearch, 1000);

  return (
    <View flex={1}>
      <Input
        flex={0}
        placeholder="Search creators"
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
          <CreatorsSearchList
            navigation={navigation}
            setSearchTrigger={setSearchTrigger}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : (
          <CreatorsList navigation={navigation} />
        )}
      </View>
    </View>
  );
};

export default CreatorsScreen;
