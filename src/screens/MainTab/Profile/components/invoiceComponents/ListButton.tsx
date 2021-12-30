import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {numberFormat} from '../../../../../config/formatCurrency';
import {InvoiceProps} from '../../../../../types/InvoiceType';
import dayjs from 'dayjs';
import Box from '../../../../../components/Box';

export interface ListButtonProps {
  label: string;
  value: string;
}
interface Props extends ListButtonProps {
  items: ListButtonProps;
}


const ListedButton = ({items}: Props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => true}>
        <View style={styles.container}>
          <View style={{flex:1}}>
              <View key={items.label}>
                <Text style={styles.txt} color="#E9707D" marginV-10 marginL-10>
                  {items.label}
                </Text>
                <View height={3} bg-dark80 marginT-12 />
              </View>
           
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListedButton;

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

    flex: 1,
  },
 

});
