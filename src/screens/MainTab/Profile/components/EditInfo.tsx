import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Box from '../../../../components/Box';
import ListedButton, { ListButtonProps } from './invoiceComponents/ListButton';



const initDataCheck = [
  {
    label: 'Quên mật khẩu',
    value: 'Forget Password',
  },
  {
    label: 'Đổi mật khẩu',
    value: 'Change Password',
  },
  {
    label: 'Đăng xuất',
    value: 'LogOut',
  },
];


const EditInfo = () => {
  return (
    <ScrollView>
      <Box padding="m">
       
      
      </Box>  
      <Box padding="m">
      

       <ScrollView>
         {initDataCheck.map((item,index) =>(
           <ListedButton   items={item} key={index} label={item.label} value={item.value}  />
         ))}
       </ScrollView>
      </Box>
    </ScrollView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({});
