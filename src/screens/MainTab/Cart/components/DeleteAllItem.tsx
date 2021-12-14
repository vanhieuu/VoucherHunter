import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View, Colors} from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import URL from '../../../../config/Api';
import { RootState } from '../../../../redux/store';
import { IProduct } from '../../../../types/IProduct';
interface Props {
  id: string;
}

const DeleteAllItem = ({id}: Props) => {
  const [newCart,setNewCart] = React.useState<IProduct>()
  const [loading,setLoading] = React.useState<boolean>(false)
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
    const onPressHandle = React.useCallback(async ()=>{
        setLoading(true)
      await fetch(URL.removeAll,{
        method:'DELETE',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer${token}`,
        },
      }).then(response=>response.json())
      .then(json=>{
        setNewCart(json)
        setLoading(false)
      })
  },[])

  return (
    <View>
      <TouchableOpacity>

      </TouchableOpacity>
    </View>
  );
};

export default DeleteAllItem;

const styles = StyleSheet.create({});
