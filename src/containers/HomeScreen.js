import React, {useEffect, useState} from 'react';
import {FlatList, View, Center, Spinner, Heading} from 'native-base';
import {getComics} from '../api/comicsController';
import {Dimensions} from 'react-native';
import {isPortrait} from '../utilites/screenOrientation';
import PureItemView from '../components/PureItemView';

const HomeScreen = () => {
  const [comics, setComics] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState(null);
  const [offsetAndLoading, setOffsetAndLoad] = useState({
    offsetNum: 0,
    loading: false,
  });

  Dimensions.addEventListener('change', () => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const fetchComics = async () => {
    var response = await getComics(24, offsetAndLoading.offsetNum);
    setComics(prevComics =>
      offsetAndLoading.offsetNum === 0
        ? response
        : [...prevComics, ...response],
    );
    console.log(comics);
  };

  const handleLoadMoreComics = () => {
    setOffsetAndLoad(prevObj => {
      return {offsetNum: prevObj.offsetNum + 24, loading: true};
    });
  };

  const renderFooter = () => {
    if (!offsetAndLoading.loading) return null;
    return (
      <Center>
        <Spinner accessibilityLabel="Loading more comics" color="red.800" />
        <Heading color="red.800" fontSize="sm">
          Loading
        </Heading>
      </Center>
    );
  };

  useEffect(() => {
    setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');
    fetchComics();
  }, [offsetAndLoading.offsetNum]);

  return (
    <View flex={1} justifyContent="center">
      {comics.length > 0 ? (
        <FlatList
          onEndReached={handleLoadMoreComics}
          onEndReachedThreshold={0.5}
          m={1}
          data={comics}
          ListFooterComponent={renderFooter}
          renderItem={({item}) => {
            return (
              <PureItemView item={item} screenOrientation={screenOrientation} />
            );
          }}
          numColumns={screenOrientation === 'landscape' ? 4 : 3}
          keyExtractor={item => item.id}
          key={screenOrientation === 'landscape' ? 1 : 2}
        />
      ) : (
        <Center>
          <Spinner
            accessibilityLabel="Loading comics"
            color="red.800"
            size="lg"
          />
          <Heading color="red.800" fontSize="lg">
            Loading
          </Heading>
        </Center>
      )}
    </View>
  );
};

export default HomeScreen;
