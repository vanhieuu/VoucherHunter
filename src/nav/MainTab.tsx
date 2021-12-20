import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Assets, Colors, Image, View, Button } from 'react-native-ui-lib';
import Home from '../screens/MainTab/Home';
import { Header } from '@react-navigation/elements';
import News from '../screens/MainTab/News';
import Cart from '../screens/MainTab/Cart';
import Profile from '../screens/MainTab/Profile';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from './RootStack';
import { IProduct } from '../types/IProduct';

import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';


export type MainTabParamList = {
  Home: undefined;
  News: undefined;
  Cart: {
    item: IProduct;
  };
  Profile: undefined;
};
const Tab = createBottomTabNavigator();

const MainTab = () => {


  // const [numberCart,setNumberCart] = React.useState<IAuth>()
  const numberCart = useSelector<RootState, number>(state => state.cart.numberCart)

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
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
          tabBarIcon: ({ color }) => (
            <Image assetGroup="iconTab" assetName="ic_home" tintColor={color}
            />
          ),
          tabBarLabel: 'Trang chủ',
          headerTransparent: true,
          header: () => (
            <Header
              title="Trang chủ"
              headerTitleStyle={{
                fontSize: 22,
                fontWeight: 'bold',
                color:Colors.black
                // backfaceVisibility
              }}
              headerTitleAlign="left"
              headerRight={({ tintColor }) => {
                return (
                  <View row>
                    <Button
                      iconSource={Assets.iconHeader.ic_search}
                      style={{ width: 40, height: 40 }}
                      link
                      color={tintColor}
                      onPress={() => navigate('Search')}
                    />

                  </View>
                );
              }}
              headerStyle={{
                backgroundColor: Colors.white,
                elevation: 0,
              }}
              headerTintColor={Colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tin tức"
        component={News}
        options={{
          tabBarIcon: ({ color }) => (
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
          tabBarIcon: ({ color }) => (
            <Image
              assetGroup="iconTab"
              assetName="ic_shop"
              tintColor={color}
            />
          ),
          tabBarLabel: 'Giỏ hàng',
          headerShown: false,
          tabBarBadge: numberCart
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
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


