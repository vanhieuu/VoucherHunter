import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, Colors} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../../../config/Api';
import {getAuthAsync, IAuth} from '../../../../redux/authSlice';
import {RootState} from '../../../../redux/store';

interface Props {
  
    id: string;
  
}

const BtnDelete = ({id}: Props) => {
  const dispatch = useDispatch();
  const token = useSelector<RootState, string>(state => state.auth.accessToken);

  const [loading, setLoading] = React.useState<boolean>(false);
  const onPress = React.useCallback(async () => {
    const auth: IAuth | null = await getAuthAsync();
    setLoading(true);
    fetch(URL.removeItem, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        const success = json.success;
        //login fail
        if (!success) {
          Alert.alert('Thông báo', json.message);
          setLoading(false);
          return;
        }
        //login success

        setLoading(false);

        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  return (
    <TouchableOpacity
      style={styles.btnDelete}
      //   onPress={() => setQuantity(quantity + 1)}
      onPress={onPress}>
      <Image source={require('../../../../assets/plus.png')} />
    </TouchableOpacity>
  );
};

export default BtnDelete;

const styles = StyleSheet.create({
  btnDelete: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#E97',
  },
});
