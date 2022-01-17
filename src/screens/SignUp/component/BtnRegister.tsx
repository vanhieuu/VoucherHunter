import {NavigationProp, useNavigation} from '@react-navigation/core';
import React,{useState,useRef} from 'react';
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
import { IAuthRegister, onRegister, saveAuthAsync } from '../../../redux/authRegisterSlice';



interface Props {
  dataSend: {
    username: string;
    email:string;
    password: string;

  };
}

const BtnLogin = ({dataSend}: Props) => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const onPressRegister = React.useCallback(() => {
    setLoading(true);
    var dataSend = {
        username: username,
        email: email,
        password: password,
      };
      var formBody=[]
      formBody.push(dataSend)
    fetch(URL.Register, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    })
    .then(response => response.json())
    .then((json: IAuthRegister) => {
        
        // Register fail
        if (!json.accessToken) {
          Alert.alert('Register fail', json.message);
          
          setLoading(false);
          return;
        }
        //login Success
        
        dispatch(onRegister(json));
        setLoading(false);
        setIsRegistrationSuccess(true);
        console.log('Success', json.accessToken);
        saveAuthAsync(json);
        navigate('SignIn');
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <TouchableOpacity style={styles.btnLogin} onPress={onPressRegister}>
      <Text b24 white>
        Register
      </Text>
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
