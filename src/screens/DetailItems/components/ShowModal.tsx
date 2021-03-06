import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Pressable} from 'react-native';
import {Colors, Image, View, Text} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../../config/Api';
import RootStack, {RootStackParamList} from '../../../nav/RootStack';
import {onGetNumberCart} from '../../../redux/authCartSlice';
import {IAuthRegister} from '../../../redux/authRegisterSlice';
import {getAuthAsync, IAuth} from '../../../redux/authSlice';
import {RootState} from '../../../redux/store';
import {IProduct} from '../../../types/IProduct';

const ShowModal = ({item}: {item: IProduct}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const route = useRoute<RouteProp<RootStackParamList, 'DetailItems'>>();
  const numberCart = useSelector<RootState, number>(
    state => state.cart.numberCart,
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
        product_id: id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        Alert.alert(json.message);
        
        dispatch(onGetNumberCart({numberItemsCart: numberCart + 1}));
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
          <Pressable style={styles.buttonClose} onPress={addItemCart}>
            <Text style={styles.modalText}>Th??m v??o gi??? h??ng</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={[styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Th??m v??o gi??? h??ng</Text>
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
    backgroundColor: '#E9707D',
    marginHorizontal: 20,
    height: 45,
    width: '100%',
    borderRadius: 5,
    marginBottom: 1,
  },
  buttonClose: {
    marginBottom: 100,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginHorizontal: 10,
    borderColor: Colors.black,
    height: 60,
    borderWidth: 0.6,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 12,
    color: '#000',
    marginBottom: 2,
    textAlign: 'center',
  },
});

export default ShowModal;
