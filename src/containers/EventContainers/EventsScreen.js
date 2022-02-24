import React, {useEffect, useState, useRef, useMemo} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import debounce from 'lodash.debounce';
import {View, Input, Icon, Heading} from 'native-base';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import EventVM from '../../components/EventComponents/EventVM';
import EventList from '../../components/EventComponents/EventList';
import EventSearchList from '../../components/EventComponents/EventSearchList';
import EventsOfItemList from '../../components/EventComponents/EventOfItemList';
// import EventSearchList from '../../components/EventComponents/EventSearchList';
// import EventOfItemList from '../../components/EventComponents/EventOfItemList';

const EventsScreen = ({navigation}) => {
  const route = useRoute();

  const [itemEventsView, setItemEventsView] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState({value: '', newSearch: true});
  const [itemInfo, setItemInfo] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['0%', '43%'], []);

  const handleEventInfoSheetClose = () => {
    bottomSheetRef.current.close();
  };

  const handleEventInfoSheetOpen = event => {
    bottomSheetRef.current.expand();
    setCurrentEvent(event);
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
        case 'series':
        case 'comics':
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
      setItemEventsView(true);
    } else {
      setItemEventsView(false);
    }
  }, [route]);

  return (
    <View flex={1}>
      {!itemEventsView ? (
        <Input
          flex={0}
          placeholder="Search events"
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
        {itemEventsView ? (
          <EventsOfItemList
            handleEventInfoSheetOpen={handleEventInfoSheetOpen}
            itemInfo={itemInfo}
            navigation={navigation}
            setItemEventsView={setItemEventsView}
          />
        ) : searchTrigger ? (
          <EventSearchList
            handleEventInfoSheetOpen={handleEventInfoSheetOpen}
            setSearchTrigger={setSearchTrigger}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : (
          <EventList
            navigation={navigation}
            handleEventInfoSheetOpen={handleEventInfoSheetOpen}
          />
        )}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          handleComponent={null}
          snapPoints={snapPoints}>
          {currentEvent && (
            <BottomSheetScrollView>
              <EventVM
                navigation={navigation}
                event={currentEvent}
                handleEventInfoSheetClose={handleEventInfoSheetClose}
              />
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </View>
  );
};

export default EventsScreen;
