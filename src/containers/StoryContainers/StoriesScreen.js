import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {View} from 'native-base';
import StoryList from '../../components/StoryComponents/StoryList';
import StoriesOfItemList from '../../components/StoryComponents/StoriesOfItemList';

const StoriesScreen = ({navigation}) => {
  const route = useRoute();

  const [itemStoriesView, setItemStoriesView] = useState(false);
  const [itemInfo, setItemInfo] = useState(null);

  useEffect(() => {
    if (route.params !== undefined) {
      switch (route.params.type) {
        case 'characters':
        case 'events':
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
      setItemStoriesView(true);
    } else {
      setItemStoriesView(false);
    }
  }, [route]);

  return (
    <View flex={1}>
      <View flex={1} justifyContent="center">
        {itemStoriesView ? (
          <StoriesOfItemList
            itemInfo={itemInfo}
            navigation={navigation}
            setItemStoriesView={setItemStoriesView}
          />
        ) : (
          <StoryList navigation={navigation} />
        )}
      </View>
    </View>
  );
};

export default StoriesScreen;
