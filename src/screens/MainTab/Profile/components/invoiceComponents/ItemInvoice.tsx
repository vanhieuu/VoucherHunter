import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {numberFormat} from '../../../../../config/formatCurrency';
import {InvoiceProps} from '../../../../../types/InvoiceType';
import dayjs from 'dayjs';
import Box from '../../../../../components/Box';
const ItemInvoice = ({items}: {items: InvoiceProps}) => {
  return (
    <View flex marginB-5>
      <Text
        style={styles.txtId}
        marginT-10
        marginB-2
        numberOfLines={2}
        color={'#000'}
        marginH-12>
          {/* {items.paymentStatus === 1 ? 'Paid' : ''} */}
        <Text style={styles.txt} color={items.paymentStatus === 3 ? 'green' : '#F7CA02'}>
          {' '}
          {items.paymentStatus === 3 ? 'Đặt hàng thành công' : 'Đang xử lý...'}
       
        </Text>
      </Text>
      <TouchableOpacity onPress={() => true}>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              source={require('../../../../../assets/icon-shopee.jpg')}
              style={styles.imgStyle}
              resizeMode="contain"
            />
          </View>
          <View style={styles.contentZone}>
            {items.products.map((item, index) => (
              <View key={item._id}>
                <Text style={styles.txt} color="#E9707D" marginV-5 marginL-10>
                  {items.note}
                </Text>

                <Box flexDirection="row" marginTop="xl">
                  <Text style={styles.txt} color={'#000'} marginL-10>
                    Số lượng:{' '}
                    <Text style={styles.txt} color="#000">
                      {item.quantity} |{' '}
                    </Text>
                  </Text>

                  <Text style={styles.txt} color="#E9707D">
                    - {numberFormat.format(item.discountPrice)}
                  </Text>
                </Box>

                <Text style={styles.txt} color={'#000'} marginH-12>
                  {' '}
                  <Text style={styles.txt} color="#E9707D">
                    {dayjs(items.createdAt).format('DD/MM/YYYY')}
                  </Text>
                </Text>
                <View height={3} bg-dark80 marginT-30 />
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemInvoice;

const styles = StyleSheet.create({
  txt: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  txtId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    // elevation: 0.5,
    flexDirection: 'row',
    borderRadius: 0,
    // backgroundColor: '#fff',
  },
  imgStyle: {
    width: 80,
    height: 80,
    borderRightWidth: 1,
    marginLeft: 20,
    marginHorizontal: 20, 
    borderColor: '#000',
   
    flex:1
  },
  imgContainer: {
    borderRightWidth: 0.5,
    // borderRightWidth:1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  contentZone: {
    paddingLeft: 5,
    paddingRight: 20,
    // marginBottom:5,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    borderLeftWidth: 0.5,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
  },
});
