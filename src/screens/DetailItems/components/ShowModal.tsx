import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Pressable} from 'react-native';

import {Colors, Image, View, Text} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../../config/Api';
import {MainTabParamList} from '../../../nav/MainTab';
import {RootStackParamList} from '../../../nav/RootStack';
import {onGetProduct} from '../../../redux/authProductSlice';
import {RootState} from '../../../redux/store';
import {IProduct} from '../../../types/IProduct';

const ShowModal = ({item}: {item: IProduct}) => {
  const {navigate} = useNavigation<NavigationProp<MainTabParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [cart, setNewCart] = React.useState<IProduct>();
  const dispatch = useDispatch();
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  console.log(token)
  const route = useRoute<RouteProp<RootStackParamList, 'DetailItems'>>();
  
  

   
  const product = route.params.item;
  const id = product._id;
  const addItemCart = React.useCallback(async () => {
    setLoading(true);
    if (!token) return;
    await fetch(URL.addItemCart, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer${token}`,
      },
      body: JSON.stringify({
        product_id:id
      }),
    })
      .then(response => response.json())
      .then(json => {
        
        console.log(json);
        dispatch(onGetProduct(json));
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
              spread
              marginB-100
              paddingR-60
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'blue',
              }}>
              <Image
                source={{uri: product.img}}
                style={{
                  width: 150,
                  height: 150,
                  marginRight: 50,
                }}
              />
              <Text h17 color={Colors.white}>
                {' '}
                Số lượng{' '}
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
              Thanh toán
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
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
    marginTop: 22,
  },
  modalView: {
    backgroundColor: Colors.primary,
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
