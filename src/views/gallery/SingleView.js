import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

import {colorFFFFFF} from '../../constants/colors';

export default function SingleView({
  setViewImage,
  setImageSelected,
  dataImage,
}) {
  const RenderItem = ({item}) => {
    const _onPressItem = () => {
      setViewImage(true);
      setImageSelected(item);
    };
    return (
      <TouchableOpacity onPress={_onPressItem} style={styles.itemImage}>
        <Image source={{uri: item?.src}} style={styles.imageStyle} />
      </TouchableOpacity>
    );
  };

  const renderListImageNet = () => {
    return (
      <View>
        <FlatList
          data={dataImage}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <RenderItem item={item} />}
        />
      </View>
    );
  };

  return <View style={styles.container}>{renderListImageNet()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorFFFFFF,
  },
  itemImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  imageStyle: {
    height: 250,
    width: Dimensions.get('window').width,
  },
});
