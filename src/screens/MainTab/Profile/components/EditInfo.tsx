import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {BackHandler, ScrollView, StyleSheet} from 'react-native';
import Box from '../../../../components/Box';
import {RootStackParamList} from '../../../../nav/RootStack';
import ListedButton from './invoiceComponents/ListButton';

const initDataCheck = [
  {
    label: 'Đổi mật khẩu',
    value: 'ChangePassword',
  },
  {
    label: 'Thoát tài khoản',
    value: 'LogOut',
  },
];

const EditInfo = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
    console.log(AsyncStorage.clear())
}

  return (
    <ScrollView>
      <Box padding="m"></Box>
      <Box padding="m">
        <ScrollView>
          {initDataCheck.map((item, index) => (
            <ListedButton
              items={item}
              key={index}
              label={item.label}
              value={item.value}
              onPress={()=>{
                if(item.value === 'LogOut'){
                  clearAsyncStorage()
                  // navigation.navigate('SignIn')
                  BackHandler.exitApp();
                }else if(item.label === 'Đổi mật khẩu'){
                  navigation.navigate('ChangePassword')
                }
               
              }}
            />
            
          ))}
        </ScrollView>
       
      </Box>
    </ScrollView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({});
