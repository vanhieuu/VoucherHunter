import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import Box from '../../../components/Box';
import {numberFormat} from '../../../config/formatCurrency';

interface ItemInvoiceProps {
  name: string;
  img: string;
  price: number;
  quantity: number;
}

const ItemDetail = ({name, img, price, quantity}: ItemInvoiceProps) => {
  return (
    <View flex>
      <View style={styles.container}>
        <View style={styles.contentZone}>
          <View flex row style={{borderBottomWidth: 0.5}}>
            <View style={styles.imgContainer} padding-5>
              <Image
                source={{uri: img}}
                style={styles.imgStyle}
                resizeMode="contain"
              />
            </View>
            <Box flexDirection="column" marginTop="m" flex={1} marginBottom="m">
              <Text style={styles.txt} color="#E9707D" marginV-5 marginL-10>
                {name}
              </Text>
              <Box flexDirection="row">
                <Text style={styles.txt} color={'#000'} marginL-10>
                  Số lượng:{' '}
                  <Text style={styles.txt} color="#000">
                    {quantity} |{' '}
                  </Text>
                </Text>

                <Text style={styles.txt} color="#E9707D">
                  {numberFormat.format(price)}
                </Text>
              </Box>
            </Box>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemDetail;

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
    flexDirection: 'row',
    borderRadius: 0,
    flex: 1,
    backgroundColor: '#fff',
  },
  imgStyle: {
    width: 80,
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
    
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0.5,
    width: '100%',
    flex: 1,
  },
});
