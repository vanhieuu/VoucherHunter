import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Assets, Colors, Image, View, Button} from 'react-native-ui-lib';
import Home from '../screens/MainTab/Home';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {Header} from '@react-navigation/elements';
import {FONTS} from '../config/Typo';
import News from '../screens/MainTab/News';
import Cart from '../screens/MainTab/Cart';
import Profile from '../screens/MainTab/Profile';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from './RootStack';
import { IProduct } from '../types/IProduct';
import { IAuth } from '../redux/authCartSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


export type MainTabParamList = {
  Home: undefined;
  News: undefined;
  Cart:{
    item:IProduct;
  };
  Profile: undefined;
};
const Tab = createBottomTabNavigator();

const MainTab = () => {


  // const [numberCart,setNumberCart] = React.useState<IAuth>()

  
   
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.dark50,
      }}>
      <Tab.Screen
        name="Trang chủ"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Image assetGroup="iconTab" assetName="ic_home" tintColor={color}
            
            />
          ),
          tabBarLabel: 'Trang chủ',
          headerTransparent: true,
          header: () => (
            <Header
              title="Home"
              headerTitleStyle={{
                fontSize: 27,
                fontFamily: FONTS.Heavy,
              }}
              headerTitleAlign="left"
              headerRight={({tintColor}) => {
                return (
                  <View row>
                    <Button
                      iconSource={Assets.iconHeader.ic_search}
                      style={{width: 44, height: 44}}
                      link
                      color={tintColor}
                      onPress={() =>navigate('Search')}
                    />
                    <Button
                      iconSource={Assets.iconHeader.ic_option}
                      style={{width: 44, height: 44}}
                      link
                      color={tintColor}
                    />
                  </View>
                );
              }}
              headerStyle={{
                backgroundColor: Colors.transparent,
              }}
              headerTintColor={Colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tin tức"
        component={News}
        options={{
          tabBarIcon: ({color}) => (
            <Image assetGroup="iconTab" assetName="ic_new" tintColor={color} />
          ),
          tabBarLabel: 'Tin tức',
          headerShown: false,
          
        }}
      />
      <Tab.Screen
        name="Giỏ hàng"
        component={Cart}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              assetGroup="iconTab"
              assetName="ic_shop"
              tintColor={color}
            />
          ),
          tabBarLabel: 'Giỏ hàng',
          headerShown: false,
          tabBarBadge:1
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              assetGroup="iconTab"
              assetName="ic_profile"
              tintColor={color}
            />
          ),
          tabBarLabel: 'Cá nhân',
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;


