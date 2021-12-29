import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {numberFormat} from '../../../../../config/formatCurrency';
import {InvoiceProps} from '../../../../../types/InvoiceType';
import dayjs from 'dayjs';
const ItemInvoice = ({items}: {items: InvoiceProps}) => {
  return (
    <View backgroundColor="#fff" flex marginB-2>
      <TouchableOpacity onPress={() => true}>
        <View>
          <View paddingL-5 paddingR-20 marginB-5>
            <Text
              style={styles.txtId}
              marginT-10
              marginB-5
              numberOfLines={2}
              color={'#E79D'}
              marginH-12>
              Id: {items._id}
            </Text>
            <Text style={styles.txt} color={'#000'} marginH-12>
              Giá trị đơn hàng :{' '}
              <Text style={styles.txt} color="#E9707D">
                {numberFormat.format(items.totalDiscountPrice)}
              </Text>
            </Text>
            <Text
              style={styles.txt}
              color={'#000'}
              marginH-12>
              Ngày đặt đơn :{' '}
              <Text style={styles.txt}  color="#E9707D">{dayjs(items.createdAt).format('DD/MM/YYYY')}</Text>
            </Text>
          </View>
          <View height={2} bg-dark80 marginT-12 />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemInvoice;

const styles = StyleSheet.create({
  txt: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  txtId: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
