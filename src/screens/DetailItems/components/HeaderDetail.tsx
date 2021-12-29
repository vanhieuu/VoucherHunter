import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import {View, TouchableOpacity} from 'react-native';

import * as Icon from 'react-native-iconly';
import {Colors, Text} from 'react-native-ui-lib';
import {NavigationProp, useNavigation} from '@react-navigation/core';
// import { MainTabParamList } from '../../../nav/MainTab';
import {RootStackParamList} from '../../../nav/RootStack';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

interface Props {
  scrollY: Animated.Value;
  title: string;
}

const HeaderDetail = ({scrollY, title}: Props) => {
  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        paddingBottom: 12,
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1,
        height: getStatusBarHeight(false),
        width: '12%',
      }}>
      <TouchableOpacity
        style={{
          marginLeft: 12,
          marginTop: 15,
        }}
        onPress={() => navigate('MainTab')}>
        <Icon.ArrowLeft
          size={20}
          color={Colors.primary}
          stroke="bold"
        />
      </TouchableOpacity>
      <Animated.View
        style={{
          backgroundColor: '#FFF',
          ...StyleSheet.absoluteFillObject,
          zIndex: -1,
          opacity: opacity,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grey60,
          paddingBottom: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text h17>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default HeaderDetail;

const styles = StyleSheet.create({});
