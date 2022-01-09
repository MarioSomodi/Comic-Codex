import React from 'react';
import {View, PresenceTransition, Image} from 'native-base';

class PureItemView extends React.PureComponent {
  render() {
    const {item, screenOrientation} = this.props;
    return (
      <View flex={1} flexDirection="column" m={0.5}>
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
          <Image
            borderRadius="md"
            justifyContent="center"
            alignItems="center"
            alt={item.title}
            h={screenOrientation === 'landscape' ? 250 : 200}
            source={{uri: item.thumbnailUrl}}
          />
        </PresenceTransition>
      </View>
    );
  }
}

export default PureItemView;
