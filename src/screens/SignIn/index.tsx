import React from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, Colors, Image, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {IAuth, onLogin, saveAuthAsync} from '../../redux/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../config/Api';
import {RootStackParamList} from '../../nav/RootStack';
import {Input} from 'react-native-elements';
import { RootState } from '../../redux/store';

const SignIn = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const onFocusChange = React.useCallback(() => {
    setIsFocus(true);
  }, []);
  const dispatch = useDispatch();
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorText, setErrorText] = React.useState('');
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  
  const onPressLogin = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
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
    let dataToSend = {username: username, password: password};
   await fetch(URL.Login, {
      signal: signal,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        return response.json();
      })

      .then((json: IAuth) => {
        const accessToken = json.accessToken;

        //login fail
        if (!accessToken) {
          Alert.alert('Sai thông tin đăng nhập ', json.message);
          setLoading(false);
        }
        //login Success
        console.log(json.accessToken)
        console.log(json)
        console.log(token)
        // (5) is component still mounted?
        dispatch(onLogin(json));
        saveAuthAsync(json);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('successfully aborted');
        } else {
          // handle error
        }
      });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  };

  return (
    <ScrollView style={{backgroundColor: 'white', marginTop: 50}}>
      <View style={styles.container}>
        <Image
          assetGroup="signUp"
          assetName="Login"
          resizeMode="center"
          style={styles.image}
        />
        <Text style={styles.textTitle}>
          Chào mừng bạn đến với VoucherHunter
        </Text>
        <View
          style={[
            styles.containerInput,
            {borderColor: isFocus ? '#E9707D' : '#eee'},
          ]}>
          <Input
            placeholder="Tên đăng nhập"
            onFocus={onFocusChange}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            secureTextEntry={false}
            onChangeText={username => setUserName(username)}
            leftIcon={
              <Icon
                name="user"
                size={20}
                color={isFocus ? '#E9707D' : 'grey'}
                style={styles.icon}
              />
            }
            autoCompleteType={undefined}
          />
        </View>
        <View
          style={[
            styles.containerInput,

            {borderColor: isFocus ? '#E9707D' : '#eee'},
          ]}>
          <Input
            placeholder="Mật khẩu"
            onFocus={onFocusChange}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            secureTextEntry
            onChangeText={password => setPassword(password)}
            leftIcon={
              <Icon
                name="lock"
                size={20}
                color={isFocus ? '#E9707D' : 'grey'}
                style={styles.icon}
              />
            }
            autoCompleteType={undefined}
          />
        </View>
        <View style={{width: '90%'}}>
          {/* <Text
            b13
            black
            style={{alignSelf: 'flex-end', color: Colors.blue}}
            onPress={() => navigate('ForgetPassword')}>
            {' '}
            Forgot your password?
          </Text> */}
        </View>
        {errorText != '' ? (
          <Text style={styles.errorTextStyle}>{errorText}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.btnLogin}
          activeOpacity={0.5}
          disabled={!!loading}
          onPress={onPressLogin}>
          {!!loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text h16 white>
              Đăng nhập
            </Text>
          )}
        </TouchableOpacity>

        <View row>
          <Text b13 black center>
            {' '}
            Bạn không có tài khoản ?
          </Text>
          <Text
            b13
            style={{color: Colors.primary}}
            centerH
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            {' '}
            Đăng kí ngay
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 130,
    marginVertical: 5,
    // backgroundColor:Colors.primary
  },
  textTitle: {
    fontFamily: 'lucida grande',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  containerInput: {
    width: '90%',
    height: 58,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
  },
  inputText: {
    color: '#0779e4',
    fontWeight: 'bold',
    marginLeft: 8,
    marginVertical: 0,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  icon: {
    marginLeft: 5,
  },
  btnLogin: {
    backgroundColor: '#E9707D',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 20,
    width: '90%',
    marginVertical: 10,
    borderWidth: 0,
  },
});
