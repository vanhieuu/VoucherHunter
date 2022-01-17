import React from 'react';
import {Dimensions, Pressable, StyleSheet, Image} from 'react-native';
import {Modal, Text, View} from 'react-native-ui-lib';
import {numberFormat} from '../../../config/formatCurrency';
import {IProduct} from '../../../types/IProduct';
interface ModalProps {
  onPress: () => void;
  visible: boolean;
  onRequestClose: () => void;
  items: [
    {
      product_id: IProduct;
      _id: string;
      listPrice: number;
      discountPrice: number;
      quantity: number;
    },
  ];
}

const {width, height} = Dimensions.get('window');

const ShowModal = ({onPress, onRequestClose, visible, items}: ModalProps) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {items?.map((item, index) => (
              <View key={index} style={{backgroundColor: '#f5f5f5'}}>
                <Text marginL-20 b20>
                  Thêm lại vào giỏ hàng
                </Text>
                <View row centerV>
                  <Image
                    source={{uri: item.product_id.img}}
                    style={{
                      width: 150,
                      height: 150,
                      justifyContent: 'center',
                      marginHorizontal: 10,
                    }}
                    resizeMode="contain"
                  />
                  <View>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}} numberOfLines={1}>
                      {item.product_id.name}
                    </Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                     Giá: {numberFormat.format(item.product_id.discountPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPress}>
              <Text style={styles.textStyle}>Thêm vào giỏ hàng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShowModal;

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,

    padding: 10,
    width: width,
    height: height / 2 - 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
  },
  button: {
    borderRadius: 5,
    width: width,
    marginTop: 10,
    padding: 15,
    position: 'relative',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#e9707d',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
