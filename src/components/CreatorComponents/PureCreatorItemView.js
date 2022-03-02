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

class PureCreatorItemView extends React.PureComponent {
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
            <VStack>
              <Text bold={true} fontSize={16}>
                {item.name}
              </Text>
              {item.role !== null && item.role !== undefined ? (
                <Text fontSize={13}>{item.role}</Text>
              ) : null}
            </VStack>
            <Icon
              as={<MaterialIcons name="search" />}
              size="6"
              ml={3}
              color="red.800"
              onPress={() =>
                navigation.navigate('CreatorDetails', {
                  creator: item,
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

export default PureCreatorItemView;
