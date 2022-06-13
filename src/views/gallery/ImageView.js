import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import {colorFFFFFF} from '../../constants/colors';

import icon from '../../../assets/images';

import Header from '../../components/Header';

export default function ImageView({onPressClose, imageData, allData}) {
  const [imageSelected, setImageSelected] = useState();
  const [listImage, setListImage] = useState([]);

  useEffect(() => {
    console.log('imageData?.src: ', imageData?.src);
    let dataSort = [];
    for (var i = 0; i < allData?.length; i++) {
      var item = {};
      item.id = i;
      item.src = allData[i]?.src;
      dataSort.push(item);
    }
    var dataFilter = dataSort.filter(val => val?.src === imageData?.src);
    setImageSelected(dataFilter[0]);
    setListImage(dataSort);
    console.log('listImage: ', listImage);
    console.log('dataSort: ', dataSort);
  }, [allData, imageData]);

  const RenderSliderImage = ({item, index}) => {
    const _onPressItem = () => {
      setImageSelected(item);
    };
    return (
      <TouchableOpacity style={styles.itemImage} onPress={_onPressItem}>
        <Image
          source={{uri: item?.src}}
          style={
            imageSelected?.id === item?.id
              ? styles.imageSlide2
              : styles.imageSlide
          }
        />
      </TouchableOpacity>
    );
  };

  const renderListImage = () => {
    return (
      <View style={styles.flatlistImage}>
        <FlatList
          data={listImage}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <RenderSliderImage item={item} index={index} />
          )}
        />
      </View>
    );
  };

  const onSwipeLeft = () => {
    console.log('You swiped left!');
    if (imageSelected?.id === listImage.length - 1) {
      return;
    } else {
      setImageSelected(listImage[imageSelected?.id + 1]);
    }
  };

  const onSwipeRight = () => {
    console.log('You swiped right!');
    if (imageSelected?.id === 0) {
      return;
    } else {
      setImageSelected(listImage[imageSelected?.id - 1]);
    }
  };

  const renderBody = () => {
    return (
      <GestureRecognizer
        onSwipeLeft={state => onSwipeLeft(state)}
        onSwipeRight={state => onSwipeRight(state)}
        style={styles.ctnBody}>
        <View>
          <Image
            source={{uri: imageSelected?.src}}
            resizeMode={'contain'}
            style={styles.imageFullView}
          />
        </View>
      </GestureRecognizer>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.fullView}>
        <Header iconLeft={icon.ic_left} onPressLeft={onPressClose} />
        {renderBody()}
        {renderListImage()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ctnBody: {
    flex: 1,
    justifyContent: 'center',
  },
  imageSlide: {
    height: 80,
    width: 50,
    borderRadius: 5,
  },
  imageSlide2: {
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  itemImage: {
    marginRight: 5,
  },
  flatlistImage: {
    marginBottom: 40,
    marginHorizontal: 8,
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  fullView: {
    backgroundColor: colorFFFFFF,
    height: Dimensions.get('window').height,
  },
  imageFullView: {
    height: '100%',
    width: '100%',
  },
});
