import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors, Text} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import URL from '../../../config/Api';
import {RootStackParamList} from '../../../nav/RootStack';

import {IAuth, onLogin, saveAuthAsync} from '../../../redux/authSlice';

interface Props {
  infoLogin: {
    username: string;
    password: string;
  };
}

const BtnLogin = ({infoLogin}: Props) => {
  
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const onPressLogin = React.useCallback( ()=>{
    console.log('pressIn')
    setErrorText('');
    if (!username) {
      Alert.alert('Tên đăng nhập không được để trống');
      return;
    }
    if (!password) {
      Alert.alert('Mật khẩu không được để trống ');
      return;
    }
    setLoading(true);
    var dataToSend = {username: username, password: password};

     fetch(URL.Login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: infoLogin.username,
        password: infoLogin.password,
      }),
    })
      .then(response => response.json())
      .then((json: IAuth) => {
        const accessToken = json.accessToken;
        console.log(json)
        //login fail
        if (!accessToken) {
          Alert.alert('Sai thông tin đăng nhập ', json.message);
          setLoading(false);
          return;
        }
        //login Success
        dispatch(onLogin(json));
        setLoading(false);
        saveAuthAsync(json);
        navigate('MainTab');
      })
      .catch(error => {
        console.error(error);
      });
  },[])
  return (
    <TouchableOpacity
      style={styles.btnLogin}
      onPress={onPressLogin}
      disabled={!!loading}>
      {!!loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text h16 white>
          Login
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default BtnLogin;

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
    width: '90%',
    marginVertical: 10,
    borderWidth: 0,
  },
});
