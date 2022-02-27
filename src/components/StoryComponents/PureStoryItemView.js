import React from 'react';
import {
  PresenceTransition,
  View,
  Divider,
  HStack,
  VStack,
  Text,
  Icon,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class PureStoryItemView extends React.PureComponent {
  render() {
    const {item, navigation} = this.props;
    return (
      <View flex={1} flexDirection="column">
        <PresenceTransition
          visible={true}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 250,
            },
          }}>
          <Divider h={0.4} backgroundColor="black" borderRadius={50} />
          <HStack p={2} justifyContent="space-between" alignItems="center">
            <VStack maxW="90%">
              <Text bold={true} fontSize={16}>
                {item.title}
              </Text>
            </VStack>
            <Icon
              as={<MaterialIcons name="search" />}
              size="6"
              ml={3}
              color="red.800"
              onPress={() =>
                navigation.navigate('StoryDetails', {
                  story: item,
                  load: false,
                })
              }
            />
          </HStack>
          <Divider h={0.4} backgroundColor="black" borderRadius={50} />
        </PresenceTransition>
      </View>
    );
  }
}

export default PureStoryItemView;
