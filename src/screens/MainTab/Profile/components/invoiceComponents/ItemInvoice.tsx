import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {numberFormat} from '../../../../../config/formatCurrency';
import {InvoiceProps} from '../../../../../types/InvoiceType';
import dayjs from 'dayjs';
import Box from '../../../../../components/Box';
const ItemInvoice = ({items}: {items: InvoiceProps}) => {
  return (
    <View  flex marginB-5>
      <Text
        style={styles.txtId}
        marginT-10
        marginB-2
        numberOfLines={2}
        color={'#000'}
        marginH-12>
        Trạng thái đơn hàng :
        <Text style={styles.txt} color="#8CCE46">
          {' '}
          {items.paymentStatus}
        </Text>
      </Text>
      <TouchableOpacity onPress={() => true}>
        <View style={styles.container}>
          <Image
            source={require('../../../../../assets/icon-shopee.png')}
            style={{width: 100, height: 100,borderRightWidth:1,marginLeft:20,marginHorizontal:20,borderColor:'#000'}}
            resizeMode="contain"
          />
          <View paddingL-5 paddingR-20 marginB-5>
          <Text style={styles.txt} color="#E9707D" marginV-5 marginL-10> 
                {items.note}
              </Text>
            <Box flexDirection="row" marginTop='m'>
              <Text style={styles.txt} color={'#000'} marginL-10 >
                Số lượng:{' '}
                <Text style={styles.txt} color="#E9707D">
                  {items.products.map(item => item.quantity)} |{' '}
                </Text>
              </Text>
              <Text style={styles.txt} color="#E9707D" > 
                {numberFormat.format(items.totalDiscountPrice)}
              </Text>
            </Box>

            <Text style={styles.txt} color={'#000'} marginH-12>
              {' '}
              <Text style={styles.txt} color="#E9707D">
                {dayjs(items.createdAt).format('DD/MM/YYYY')}
              </Text>
            </Text>
          </View>
          <View height={3} bg-dark80 marginT-12 />
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  container:{
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius:1,
    elevation: 1.9,
    flexDirection: 'row',borderRadius:5,backgroundColor:'#fff'
  }
});
