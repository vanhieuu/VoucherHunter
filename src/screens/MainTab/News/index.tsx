import { RouteProp, useRoute } from '@react-navigation/core';
import React from 'react'
import { Platform, StyleSheet, Text, UIManager, View } from 'react-native'
import { MainTabParamList } from '../../../nav/MainTab';
import ListHorizontal from './components/ListHorizontal';


if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const News = () => { 

  return (
    <ListHorizontal/>
  )
}

export default News

const styles = StyleSheet.create({})
