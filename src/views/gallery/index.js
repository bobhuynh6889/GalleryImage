/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {color3777EE, colorFFFFFF} from '../../constants/colors';
import icon from '../../../assets/images';

import Header from '../../components/Header';
import ImageView from './ImageView';

import NetView from './NetView';
import SingleView from './SingleView';

export default function Gallery({route}) {
  const [isViewImage, setViewImage] = useState(false);
  const [imageSelected, setImageSelected] = useState();
  const passingData = route?.params?.data;

  return (
    <View style={styles.container}>
      <Header textCenter={'Gallery Image'} />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: color3777EE,
          headerShown: false,
        }}>
        <Tab.Screen
          name={'SingleView'}
          options={{
            title: 'Single View',
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  source={icon.ic_image}
                  style={[
                    styles.iconSingle,
                    {tintColor: focused ? color3777EE : null},
                  ]}
                />
              );
            },
          }}
          component={() => (
            <SingleView
              setViewImage={setViewImage}
              setImageSelected={setImageSelected}
              dataImage={passingData}
            />
          )}
        />
        <Tab.Screen
          name={'NetView'}
          options={{
            title: 'Album',
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  source={icon.ic_menu}
                  style={[
                    styles.iconAlbum,
                    {tintColor: focused ? color3777EE : null},
                  ]}
                />
              );
            },
          }}
          component={() => (
            <NetView
              setViewImage={setViewImage}
              setImageSelected={setImageSelected}
              dataImage={passingData}
            />
          )}
        />
      </Tab.Navigator>
      {isViewImage && (
        <ImageView
          onPressClose={() => {
            setViewImage(false);
          }}
          imageData={imageSelected}
          allData={passingData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorFFFFFF,
  },
  iconAlbum: {
    height: 24,
    width: 24,
  },
  iconSingle: {
    height: 30,
    width: 30,
  },
});
