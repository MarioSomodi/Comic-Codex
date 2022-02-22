import React from 'react';
import {PresenceTransition, Image, Pressable} from 'native-base';
import placeholderImage from '../../assets/images/Placeholder.png';

class PureSeriesItemView extends React.PureComponent {
  render() {
    const {item, handleSeriesInfoSheetOpen} = this.props;
    return (
      <Pressable
        onPress={() => handleSeriesInfoSheetOpen(item)}
        flex={1}
        maxW="33%"
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
            alt={item.title}
            h={200}
            source={
              item.thumbnail === true ? placeholderImage : {uri: item.thumbnail}
            }
          />
        </PresenceTransition>
      </Pressable>
    );
  }
}

export default PureSeriesItemView;
