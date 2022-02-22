/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  FlatList,
  View,
  Center,
  Spinner,
  Heading,
  Text,
  HStack,
  IconButton,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isPortrait} from '../../utilites/screenOrientation';
import PureComicItemView from './PureComicItemView';
import {GetCharactersComics} from '../../api/controllers/charactersController';
import {GetCreatorsComics} from '../../api/controllers/creatorController';

const ComicsOfItemList = ({
  handleComicInfoSheetOpen,
  itemInfo,
  setItemComicsView,
  navigation,
}) => {
  const [itemComics, setItemComics] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [endOfResults, setEndOfResults] = useState(true);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });

  const fetchItemComics = async first => {
    var response;
    switch (itemInfo.type) {
      case 'characters': {
        response = await GetCharactersComics(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      case 'creators': {
        response = await GetCreatorsComics(
          99,
          first ? 0 : offsetAndLoading.offsetNum,
          itemInfo.id,
        );
        break;
      }
      default: {
        break;
      }
    }
    if (typeof response[0] === 'string') {
      setEndOfResults(true);
    } else {
      if (response.length < 99) {
        setEndOfResults(true);
      } else {
        setEndOfResults(false);
      }
      setItemComics(prevItemComics =>
        first ? response : [...prevItemComics, ...response],
      );
    }
  };

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const renderItem = useCallback(({item}) => {
    return (
      <PureComicItemView
        handleComicInfoSheetOpen={handleComicInfoSheetOpen}
        item={item}
      />
    );
  }, []);

  const renderFooterChar = () => {
    if (!offsetAndLoading.loading) {
      return null;
    }
    return endOfResults ? (
      <Center>
        <Heading color="red.800" fontSize="sm">
          End of results
        </Heading>
      </Center>
    ) : (
      <Center>
        <Spinner accessibilityLabel="Loading more comics" color="red.800" />
        <Heading color="red.800" fontSize="sm">
          Loading
        </Heading>
      </Center>
    );
  };

  const handleLoadMoreItemComics = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 99, loading: true};
    });
  };

  const keyExtractor = useCallback(item => item.id, []);

  const goBackToItemsScreen = () => {
    setItemComicsView(false);
    switch (itemInfo.type) {
      case 'characters': {
        navigation.navigate('CharacterDetails', {
          loadFromId: itemInfo.id,
          load: true,
        });
        break;
      }
      case 'creators': {
        navigation.navigate('CreatorDetails', {
          loadFromId: itemInfo.id,
          origin: itemInfo.origin,
          load: true,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    if (itemInfo !== null) {
      setItemComics([]);
      setOffsetAndLoad({
        offsetNum: 0,
        loading: true,
      });
      setEndOfResults(false);
      fetchItemComics(true);
    }
  }, [itemInfo]);

  useEffect(() => {
    if (!endOfResults && offsetAndLoading.offsetNum !== 0) {
      fetchItemComics(false);
    }
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1}>
      {itemComics.length > 0 && itemComics[0] !== 'false' ? (
        <View flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text m={1} flex={1} fontSize={17}>
              Comics of {itemInfo.type.substring(0, itemInfo.type.length - 1)}:{' '}
              <Text fontSize={17} bold={true}>
                {itemInfo.name}
              </Text>
            </Text>
            <IconButton
              onPress={goBackToItemsScreen}
              alignSelf="flex-start"
              size="sm"
              ml={1}
              variant="ghost"
              _pressed={{
                bg: 'white',
                _icon: {
                  color: 'red.600',
                },
              }}
              _icon={{
                as: MaterialIcons,
                name: 'close',
              }}
            />
          </HStack>
          <FlatList
            getItemLayout={getItemLayout}
            onEndReached={handleLoadMoreItemComics}
            onEndReachedThreshold={0.5}
            m={1}
            data={itemComics}
            ListFooterComponent={renderFooterChar}
            renderItem={renderItem}
            numColumns={screenOrientation === 'landscape' ? 6 : 3}
            keyExtractor={keyExtractor}
            key={screenOrientation === 'landscape' ? 1 : 2}
          />
        </View>
      ) : (
        <Center flex={1}>
          <View>
            <Spinner
              accessibilityLabel="Loading characters comics"
              color="red.800"
              size="lg"
            />
            <Heading color="red.800" fontSize="lg">
              Loading {itemInfo.type} comics
            </Heading>
          </View>
        </Center>
      )}
    </View>
  );
};

export default ComicsOfItemList;
