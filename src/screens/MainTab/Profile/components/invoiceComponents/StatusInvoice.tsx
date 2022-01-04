import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {PaymentStatus} from '../../../../../types/InvoiceType';
import dayjs from 'dayjs';

interface StatusProps {
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  _id: string;
}

const StatusInvoice = ({paymentMethod, paymentStatus, _id}: StatusProps) => {
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
              Id: {_id}
            </Text>
            <Text style={styles.txt} color={'#000'} marginH-12>
              Phương thức thanh toán :{' '}
              <Text style={styles.txt} color="#E9707D">
                {paymentMethod}
              </Text>
            </Text>
            <Text style={styles.txt} color={'#000'} marginH-12>
              Trạng thái đơn hàng :{' '}
              <Text style={styles.txt} color="#E9707D">
                {paymentStatus}
              </Text>
            </Text>
          </View>
          <View height={2} bg-dark80 marginT-12 />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StatusInvoice;

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
