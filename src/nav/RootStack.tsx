import React from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from '../screens/Onboarding';
import SignUp from '../screens/SignUp';
import MainTab from './MainTab';
import {IProduct} from '../types/IProduct';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  EStatusAuth,
  getAuthAsync,
  IAuth,
  onLogin,
  updateStatusAuth,
} from '../redux/authSlice';
import DetailItems from '../screens/DetailItems';
import {INewsData} from '../redux/newSlice';
import DetailNews from '../screens/DetailNews';
import SignIn from '../screens/SignIn';
import URL from '../config/Api';
import Search from '../screens/Search';
import {Colors, View} from 'react-native-ui-lib';
import ChangePassword from '../screens/ChangePassword';

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ChangePassword: undefined;
  MainTab: undefined;
  DetailItems: {
    item: IProduct;
  };
  DetailNews: {
    item: INewsData;
  };
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const statusAuth = useSelector<RootState, EStatusAuth>(
    state => state.auth.statusAuth,
  );

  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const checkLogin = async () => {
    const auth: IAuth | null = await getAuthAsync();
    if (auth) {
      fetch(URL.CheckToken, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          accesToken: auth.accessToken,
        }),
      })
        .then(response => response.json())
        .then((json: {error: string; success: boolean}) => {
          const error = json.error;
          const success = json.success;
          //token fail
          if (!token) {
            Alert.alert('Đã hết phiên đăng nhập', 'vui lòng đăng nhập lại ');
            dispatch(updateStatusAuth({statusAuth: EStatusAuth.unauth}));
            return;
          } else {
            dispatch(onLogin(auth));
            return json;
          }
          //token success
        });
    } else {
      dispatch(updateStatusAuth({statusAuth: EStatusAuth.unauth}));
    }
  };

  React.useEffect(() => {
    checkLogin();
  }, [statusAuth]);

  if (statusAuth === EStatusAuth.check) {
    return (
      <View flex center>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        {statusAuth === EStatusAuth.unauth ? (
          <>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: true,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="MainTab"
              component={MainTab}
              options={{headerShown: false}}
            />
          </>
        )}
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailItems"
          component={DetailItems}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="DetailNews"
          component={DetailNews}  
          options={{
          headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
