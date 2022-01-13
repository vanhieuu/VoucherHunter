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
        <Text
          style={styles.txt}
          color={items.paymentStatus === 3 ? 'green' : '#F7CA02'}>
          {' '}
          {items.paymentStatus === 3 ? 'Đặt hàng thành công' : 'Đang xử lý...'}
        </Text>
      </Text>
      <TouchableOpacity onPress={() => true}>
        <View style={styles.container}>
          <View style={styles.contentZone}>
            {items.products.map((item, index) => (
              <View key={item._id} flex row style={{borderBottomWidth:0.5}}>
                <View style={styles.imgContainer} padding-5>
                  <Image
                    source={{uri: item?.product_id?.img}}
                    style={styles.imgStyle}
                    resizeMode="contain"
                  />
                </View>

                <Box
                  flexDirection="column"
                  marginTop="m"
                  flex={1}
                  marginBottom="m">
                  <Text style={styles.txt} color="#E9707D" marginV-5 marginL-10>
                    {item?.product_id?.name}
                  </Text>
                  <Box flexDirection="row">
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

                  <Box
                    marginTop="s"
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginRight: 30,
                    }}>
                    <Text style={styles.txt} color={'#000'}>
                      {' '}
                      <Text style={styles.txt} color="#E9707D" marginR-10>
                        Ngày mua: {dayjs(items.createdAt).format('DD/MM/YYYY')}
                      </Text>
                    </Text>
                  </Box>
                </Box>
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
    flex: 1,

    backgroundColor: '#fff',
  },
  imgStyle: {
    width: 100,
    height: 80,
    borderColor: '#000',
    flex: 1,
  },
  imgContainer: {
    borderRightWidth: 0.5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0.5,
    backgroundColor: '#fff',
    borderRadius: 0,
  },
  contentZone: {
    
   
    // marginBottom:5,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0.5,
    width: '100%',
    flex: 1,
  },
});
