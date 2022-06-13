import {StyleSheet} from 'react-native';
import {color040404} from './colors';

export const customTxt = (size, txtColor, fontWeight) =>
  StyleSheet.create({
    txt: {
      fontFamily: 'Arial',
      fontWeight: fontWeight || '400',
      fontSize: size || 13,
      color: txtColor || color040404,
    },
  });
