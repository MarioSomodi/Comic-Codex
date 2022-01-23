import React from 'react';
import {PresenceTransition, Image, Pressable} from 'native-base';
import placeholderImage from '../assets/images/Placeholder.png';

class PureCharacterItemView extends React.PureComponent {
  render() {
    const {item, handleCharacterInfoSheetOpen} = this.props;
    return (
      <Pressable
        onPress={() => handleCharacterInfoSheetOpen(item)}
        flex={1}
        flexDirection="column"
        m={0.5}>
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
            h={200}
            source={
              item.thumbnailUrl === true
                ? placeholderImage
                : {uri: item.thumbnailUrl}
            }
          />
        </PresenceTransition>
      </Pressable>
    );
  }
}

export default PureCharacterItemView;
