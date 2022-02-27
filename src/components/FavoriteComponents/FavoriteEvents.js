/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {firebase} from '@react-native-firebase/database';
import {Dimensions} from 'react-native';
import {View, Center, Spinner, Heading, FlatList} from 'native-base';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PureEventItemView from '../EventComponents/PureEventItemView';
import EventVM from '../../components/EventComponents/EventVM';
import {isPortrait} from '../../utilites/screenOrientation';

const FavoriteEvents = ({navigation, user}) => {
  const [favoriteEvents, setFavoriteEvents] = useState(null);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['0%', '43%'], []);

  const handleEventInfoSheetClose = () => {
    bottomSheetRef.current.collapse();
  };

  const handleEventInfoSheetOpen = event => {
    bottomSheetRef.current.expand();
    setCurrentEvent(event);
  };

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const getFavoriteEvents = async () => {
    try {
      const database = firebase
        .app()
        .database(
          'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
        );
      var DB = await database.ref('/events').on('value', snapshot => {
        var favoriteEventsDB = snapshot.val();
        favoriteEventsDB.shift();
        if (favoriteEventsDB !== undefined && favoriteEventsDB.length > 0) {
          favoriteEventsDB.forEach(usersFavoriteEvents => {
            if (usersFavoriteEvents.userUID === user.uid) {
              var fEvents = [];
              usersFavoriteEvents.favoriteEvents.forEach(favoriteEvent => {
                fEvents.push(favoriteEvent);
              });
              setFavoriteEvents(fEvents);
            }
          });
        } else {
          setFavoriteEvents([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = useCallback(({item}) => {
    return (
      <PureEventItemView
        handleEventInfoSheetOpen={handleEventInfoSheetOpen}
        item={item}
      />
    );
  }, []);

  const keyExtractor = useCallback(item => item.id, []);

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    getFavoriteEvents();
  }, []);

  return favoriteEvents !== null ? (
    favoriteEvents.length !== 0 ? (
      <View flex={1} justifyContent="center">
        <FlatList
          getItemLayout={getItemLayout}
          flex={3}
          m={1}
          data={favoriteEvents}
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
    ) : (
      <Center flex={1}>
        <Heading color="red.800" fontSize="lg">
          You have not favorited any events yet.
        </Heading>
      </Center>
    )
  ) : (
    <Center flex={1}>
      <Spinner accessibilityLabel="Loading events" color="red.800" size="lg" />
      <Heading color="red.800" fontSize="lg">
        Loading your favorite events
      </Heading>
    </Center>
  );
};

export default FavoriteEvents;
