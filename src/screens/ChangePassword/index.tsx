import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Colors, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import Box from '../../components/Box';
import URL from '../../config/Api';
import { getAuthAsync, IAuth } from '../../redux/authSlice';
import Header from '../components/Header';

const {width} = Dimensions.get('window');
const ChangePassword = () => {
const navigation = useNavigation();
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const onFocusChange = React.useCallback(() => {
    setIsFocus(true);
  }, []);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorText, setErrorText] = React.useState('');
  const [securityOldPassword, setSecurityOld] = React.useState<boolean>(true);
  const [securityNewPassword, setSecurityNew] = React.useState<boolean>(true);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');


 const  clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

  const onPressChange = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const auth: IAuth | null = await getAuthAsync();
    setErrorText('');
    if (!oldPassword) {
      Alert.alert('Mật khẩu không được để trống');
      return;
    }
    if (!newPassword) {
      Alert.alert('Mật khẩu không được để trống ');
      return;
    }
    if (oldPassword === newPassword) {
      Alert.alert('Mật khẩu mới không được trùng lặp ');
    }
    let dataToSend = {oldPassword: oldPassword, newPassword: newPassword};
    setLoading(true);
    await fetch(URL.changePassword, {
        signal:signal,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.accessToken}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        return response.json();
      })
      .then((json: {message: string,error: string}) => {
        const message = json.message;
        const error = json.error;
        if (error) {
          Alert.alert(json.message,json.error);
        }
        console.log(json)
        Alert.alert('Đổi mật khẩu thành công')
        setLoading(false);
        clearAsyncStorage();
       
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

  const theme = useTheme();
  return (
    <Box flex={1} backgroundColor="background">
      <Box flex={0.15} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary">
          <Header
            left={{
              icon: 'arrow-left',
              onPress: () => {
                console.log('click');
              },
            }}
            title="Đổi mật khẩu"
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box
          position="absolute"
          left={width / 2 - 50}
          top={-40}
          width={100}
          height={100}
          style={{borderRadius: 50}}></Box>
        <Box marginVertical="m" style={{marginTop: 50 + theme.spacing.m}}></Box>
        <View
          marginH-20
          style={[
            styles.containerInput,
            {borderColor: isFocus ? '#000' : '#eee'},
          ]}>
          <Input
            placeholder="Mật khẩu cũ"
            inputStyle={styles.inputText}
            onFocus={onFocusChange}
            inputContainerStyle={styles.inputContainer}
            secureTextEntry={securityOldPassword}
            onChangeText={oldPassword => setOldPassword(oldPassword)}
            leftIcon={
              <Icon name="lock" size={20} color="#E9707D" style={styles.icon} />
            }
            rightIcon={
              <Icon
                name={securityOldPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="#E9707D"
                style={styles.icon}
                onPress={() => {
                  setSecurityOld(prev => !prev);
                }}
              />
            }
            autoCompleteType={undefined}
          />
        </View>

        <View
          marginH-20
          style={[
            styles.containerInput,
            {borderColor: isFocus ? '#000' : '#eee'},
          ]}>
          <Input
            placeholder="Mật khẩu mới"
            inputStyle={styles.inputText}
            onFocus={onFocusChange}
            inputContainerStyle={styles.inputContainer}
            secureTextEntry={securityNewPassword}
            onChangeText={newPassword => setNewPassword(newPassword)}
            leftIcon={
              <Icon name="lock" size={20} color="#E9707D" style={styles.icon} />
            }
            rightIcon={
              <Icon
                name={securityNewPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="#E9707D"
                style={styles.icon}
                onPress={() => setSecurityNew(prev => !prev)}
              />
            }
            autoCompleteType={undefined}
          />
        </View>

        <TouchableOpacity
          style={styles.btnLogin}
          activeOpacity={0.5}
          disabled={!!loading}
          onPress={onPressChange}>
          {!!loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text m16 white>
              Đổi mật khẩu
            </Text>
          )}
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default ChangePassword;

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
    borderRadius: 25,
    width: '90%',
    marginVertical: 15,
    borderWidth: 0,
    marginHorizontal: 20,
  },
  img: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
  },
  container1: {
    justifyContent: 'space-between',
  },
});
