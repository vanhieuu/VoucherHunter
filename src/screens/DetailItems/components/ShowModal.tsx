import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Pressable} from 'react-native';
import {Colors, Image, View, Text} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../../config/Api';
import {RootStackParamList} from '../../../nav/RootStack';
import {onAddToCart} from '../../../redux/authCartSlice';
import {IAuthRegister} from '../../../redux/authRegisterSlice';
import {getAuthAsync, IAuth} from '../../../redux/authSlice';
import {RootState} from '../../../redux/store';
import {IProduct} from '../../../types/IProduct';

const ShowModal = ({item}: {item: IProduct}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const route = useRoute<RouteProp<RootStackParamList, 'DetailItems'>>();
  const registerToken = useSelector<RootState, string>(
    state => state.register.accessToken,
  );
  const product = route.params.item;
  const id = product._id;
  const dispatch = useDispatch();
 
  const addItemCart = React.useCallback(async () => {
    const auth: IAuth | null = await getAuthAsync();
    const registerAuth: IAuthRegister | null = await getAuthAsync();
    setLoading(true);
    fetch(URL.addItemCart, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          auth?.accessToken || registerAuth?.accessToken
        }`,
      },
      body: JSON.stringify({
        product_id: product._id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        Alert.alert(json.message);
        dispatch(onAddToCart(json));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              row
              flex
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={{uri: product.img}}
                style={{
                  width: 150,
                  height: 150,
                }}
              />
              <Text
                style={{fontSize: 20}}
                color={Colors.black}
                center
                marginL-12>
                {item.name}
              </Text>
            </View>
            <Pressable
              style={{
                flex: 0,
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                position: 'absolute',
                flexDirection: 'row-reverse',
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>x</Text>
            </Pressable>
          </View>
          <Pressable
            style={{
              marginBottom: 100,
              alignItems: 'center',
              alignSelf: 'stretch',
              backgroundColor: '#f5f5f5',
              borderRadius: 10,
              marginHorizontal: 10,
              borderColor: Colors.black,
              height: 60,
              borderWidth: 0.6,
            }}
            onPress={addItemCart}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: 12,
              }}>
              Thêm vào giỏ hàng
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={[ styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Thêm vào giỏ hàng</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  modalView: {
    backgroundColor: Colors.white,
    padding: 15,
    alignItems: 'center',
    height: '45%',
    width: '95%',
    flexDirection: 'row',
  },
  button: {
    padding: 10,

    // alignItems:'flex-end',
    alignSelf: 'flex-end',
    width: '100%',
    marginTop: 125,
  },
  buttonOpen: {
    backgroundColor: Colors.primary,
    marginHorizontal:20,
    height:45,
    width: '100%',

  },
  buttonClose: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 2,
    textAlign: 'center',
  },
});

export default ShowModal;
