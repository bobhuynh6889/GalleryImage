/* eslint-disable no-sparse-arrays */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';

import {customTxt} from '../constants/css';
import {color040404, colorFFFFFF} from '../constants/colors';
import icon from '../../assets/images';
import NavigationService from '../navigation';

export default function Header({
  backgroundColor,
  onPressLeft,
  onPressRight,
  textRight,
  txtRightStyle,
  iconLeft,
  textRightColor,
  rightDisabled,
  textCenter,
  textCenterColor,
}) {
  const [h, setH] = React.useState(0);

  useEffect(() => {
    const {StatusBarManager} = NativeModules;
    setH(StatusBarManager.HEIGHT);
  }, []);

  const txtTextRightColor = {color: textRightColor};
  const txtBackgroundColor = {backgroundColor: backgroundColor || colorFFFFFF};
  const txtTextCenterColor = {color: textCenterColor};

  const _onPressNull = () => {};

  const _onPressGoBack = () => {
    NavigationService.goBack();
  };

  return (
    <View style={heighNavi(h).fullView}>
      {/* STATUS BAR */}
      {Platform.OS === 'ios' && (
        <View style={[txtBackgroundColor, {height: h}]} />
      )}
      {/* HEADER */}
      <View style={[styles.container, txtBackgroundColor]}>
        {/* LEFT */}
        <TouchableOpacity
          onPress={onPressLeft || _onPressGoBack}
          style={styles.contentCornerLeft}>
          <Image style={styles.imgIcon} source={iconLeft || icon.ic_left} />
        </TouchableOpacity>
        {/* CENTER */}
        <View style={styles.centerView}>
          {textCenter && (
            <Text
              style={[
                customTxt(16, color040404).txt,
                styles.txtCenter,
                txtTextCenterColor,
              ]}>
              {textCenter || ''}
            </Text>
          )}
        </View>
        {/* RIGHT */}
        <TouchableOpacity
          disabled={rightDisabled}
          onPress={onPressRight || _onPressNull}
          style={styles.contentCornerRight}>
          {textRight && (
            <Text
              style={[
                customTxt(14).txt,
                txtTextRightColor,
                styles.marginR16,
                txtRightStyle,
                ,
              ]}>
              {textRight}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentCornerLeft: {
    height: '100%',
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCornerRight: {
    height: '100%',
    minWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginR16: {
    marginRight: 16,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

const heighNavi = h =>
  StyleSheet.create({
    fullView: {
      width: '100%',
      height: Platform.OS === 'android' ? 40 + h : 46 + h,
    },
  });
