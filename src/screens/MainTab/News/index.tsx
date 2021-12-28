
import React from 'react'
import { Platform, StyleSheet, UIManager} from 'react-native'

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
