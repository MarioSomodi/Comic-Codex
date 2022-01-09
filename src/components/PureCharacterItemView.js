import React from 'react';
import {View, PresenceTransition, Image} from 'native-base';
import placeholderImage from '../assets/images/Placeholder.png';

class PureCharacterItemView extends React.PureComponent {
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
            alt={item.name}
            h={screenOrientation === 'landscape' ? 250 : 200}
            source={
              item.thumbnailUrl === true
                ? placeholderImage
                : {uri: item.thumbnailUrl}
            }
          />
        </PresenceTransition>
      </View>
    );
  }
}

export default PureCharacterItemView;
