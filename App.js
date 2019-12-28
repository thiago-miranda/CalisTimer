import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import EMOMScreen from './src/screens/EMOMScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    EMOM: EMOMScreen,
  },
  {initialRoutName: 'Home', headerMode: 'screen'},
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Ubuntu',
    fontSize: 48,
    textAlign: 'center',
  },
});
