import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {colorFFFFFF} from '../../constants/colors';

export default function NetView({setViewImage, setImageSelected, dataImage}) {
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
      <View style={styles.flatlistImage}>
        <FlatList
          data={dataImage}
          numColumns={4}
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
  flatlistImage: {
    marginTop: 20,
    // alignItems: 'center',
  },
  itemImage: {
    margin: 2,
  },
  imageStyle: {
    height: 93,
    width: 93,
    borderRadius: 5,
  },
});
