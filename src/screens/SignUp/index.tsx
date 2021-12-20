import {NavigationProp, useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {View, Text, Image, Colors} from 'react-native-ui-lib';
import {FONTS} from '../../config/Typo';
import {RootStackParamList} from '../../nav/RootStack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  IAuthRegister,
  onRegister,
  saveAuthAsync,
} from '../../redux/authRegisterSlice';
import URL from '../../config/Api';
import {useDispatch} from 'react-redux';

const SignUp = () => {
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const onFocusChange = React.useCallback(() => {
    setIsFocus(true);
  }, []);
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const emailInputRef = React.useRef();
  const passwordInputRef = React.useRef();

  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSubmitButton = async () => {
    setErrorText('');
    if (!username) {
      Alert.alert('Please fill Name');
      return;
    }
    if (!email) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!password) {
      Alert.alert('Please fill Password');
      return;
    }
    if (confirmPassword != password) {
      Alert.alert('Password is incorrect');
      return;
    }
    setLoading(true);
    let dataToSend = {
      username: username,
      email: email,
      password: password,
    };
    console.log(dataToSend);
    await fetch(URL.Register, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then((json: IAuthRegister) => {
        // Register fail
        console.log(dataToSend);
        if (!json.accessToken) {
          Alert.alert('Register fail', json.message);
          setLoading(false);
          return;
        }
        //register Success
        dispatch(onRegister(json));
        setLoading(false);
        setIsRegistrationSuccess(true);
        saveAuthAsync(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (isRegistrationSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.btnLogin}
          activeOpacity={0.5}
          onPress={() => navigate('SignIn')}>
          <Text style={styles.btnLogin}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <ScrollView style={{backgroundColor: 'white', marginTop: 50}}>
      <View flex style={styles.container}>
        <Image
          assetGroup="signUp"
          assetName="CreatAccount"
          resizeMode="center"
          style={styles.img}
        />
        <Text style={styles.txtTitle}>Let's Get Started</Text>
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
            onSubmitEditing={() => emailInputRef.current}
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
            placeholder="Email"
            onFocus={onFocusChange}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            secureTextEntry={false}
            onChangeText={(email: string) => setUserEmail(email)}
            onSubmitEditing={() => passwordInputRef.current}
            blurOnSubmit={false}
            leftIcon={
              <Icon
                name="envelope"
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
            secureTextEntry={true}
            onChangeText={Password => setUserPassword(Password)}
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

        <View
          style={[
            styles.containerInput,
            {borderColor: isFocus ? '#E9707D' : '#eee'},
          ]}>
          <Input
            placeholder="Xác nhận lại mật khẩu"
            onFocus={onFocusChange}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            secureTextEntry={true}
            onChangeText={(confirmPassword: string) => {
              setConfirmPassword(confirmPassword);
            }}
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
        <TouchableOpacity
          style={styles.btnLogin}
          activeOpacity={0.5}
          onPress={handleSubmitButton}>
          <Text h16>ĐĂNG KÝ</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'space-between'}}>
          <Text center>Đã có tài khoản </Text>
          <Text
            b13
            style={{color: Colors.primary}}
            centerH
            center
            onPress={() => navigate('SignIn')}>
            Đăng nhập ngay
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  img: {
    width: 300,
    height: 130,
    marginVertical: 5,
  },
  icon: {
    marginLeft: 8,
  },
  txtTitle: {
    fontSize: 40,
    fontFamily: FONTS.Heavy,
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
  btnLogin: {
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 99,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
