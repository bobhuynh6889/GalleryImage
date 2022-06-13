import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, isMountedRef} from './index';
import Routes from './Routes';

import Gallery from '../views/gallery';
import SearchGoogle from '../views/search_google';

const Stack = createStackNavigator();

export default function RootNavigation() {
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerMode: 'none',
        }}
        initialRouteName={Routes.SEARCH_GOOGLE_SCREEN}>
        <Stack.Screen
          name={Routes.SEARCH_GOOGLE_SCREEN}
          component={SearchGoogle}
        />
        <Stack.Screen name={Routes.GALLERY_SCREEN} component={Gallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
