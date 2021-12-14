import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import { FONTS } from '../../../config/Typo';
import { Colors } from 'react-native-ui-lib';

interface Props {
  username: string;
  isPassword: boolean;
  iconName: string;
  value:string
}

const Inputs = ({username, isPassword, iconName,value}: Props) => {
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const onFocusChange = React.useCallback(() => {
    setIsFocus(true);
  }, [isFocus]);

  const [infoLogin, setInfoLogin] = React.useState({
    email: '',
    password: '',
  });
  return (
    <View
      style={[styles.container, {borderColor: isFocus ? '#E9707D' : '#eee'}]}>
      <TextInput
            placeholder="Enter Email"
            style={{fontSize: 17, fontFamily: FONTS.Book, color: Colors.dark30}}
            onChangeText={(username: string) =>
              setInfoLogin(prev => {
                return {
                  ...prev,
                  username,
                };
              })
            }
          />
    </View>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
  },
  inputText: {
    color: '#0779e4',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
});
