import React, {useEffect, useState, useRef, useMemo} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import debounce from 'lodash.debounce';
import {View, Input, Icon} from 'native-base';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import SeriesVM from '../../components/SeriesComponents/SeriesVM';
import SeriesList from '../../components/SeriesComponents/SeriesList';
import SeriesSearchList from '../../components/SeriesComponents/SeriesSearchList';
import SeriesOfItemList from '../../components/SeriesComponents/SeriesOfItemList';

const SeriesScreen = ({navigation}) => {
  const route = useRoute();

  const [itemSeriesView, setItemSeriesView] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState({value: '', newSearch: true});
  const [itemInfo, setItemInfo] = useState(null);
  const [currentSeries, setCurrentSeries] = useState(null);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['0%', '43%'], []);

  const handleSeriesInfoSheetClose = () => {
    bottomSheetRef.current.close();
  };

  const handleSeriesInfoSheetOpen = series => {
    bottomSheetRef.current.expand();
    setCurrentSeries(series);
  };

  const handleSearch = value => {
    setSearchValue({value: value, newSearch: true});
    setSearchTrigger(true);
  };

  const debounceOnChange = debounce(handleSearch, 1000);

  useFocusEffect(
    React.useCallback(() => {
      return () => bottomSheetRef.current.close();
    }, []),
  );

  useEffect(() => {
    if (route.params !== undefined) {
      switch (route.params.type) {
        case 'characters':
        case 'events':
        case 'creators': {
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
      setItemSeriesView(true);
    } else {
      setItemSeriesView(false);
    }
  }, [route]);

  return (
    <View flex={1}>
      {!itemSeriesView ? (
        <Input
          flex={0}
          placeholder="Search series"
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
        {itemSeriesView ? (
          <SeriesOfItemList
            handleSeriesInfoSheetOpen={handleSeriesInfoSheetOpen}
            itemInfo={itemInfo}
            navigation={navigation}
            setItemSeriesView={setItemSeriesView}
          />
        ) : searchTrigger ? (
          <SeriesSearchList
            handleSeriesInfoSheetOpen={handleSeriesInfoSheetOpen}
            setSearchTrigger={setSearchTrigger}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : (
          <SeriesList
            navigation={navigation}
            handleSeriesInfoSheetOpen={handleSeriesInfoSheetOpen}
          />
        )}
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
    </View>
  );
};

export default SeriesScreen;
