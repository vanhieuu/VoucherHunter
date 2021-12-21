import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Card, Text, Image, Colors} from 'react-native-ui-lib';

import {numberFormat} from '../../../../config/formatCurrency';
import {RootStackParamList} from '../../../../nav/RootStack';
import {IProduct} from '../../../../types/IProduct';

const widthScreen = Dimensions.get('window').width;

const ItemProduct = ({item}: {item: IProduct}) => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const onPressItem = React.useCallback(() => {
    navigate('DetailItems', {
      item,
    });
  }, []);
  return (
    <View
      backgroundColor="#fff"
      style={styles.container}
      flex
      >
      <TouchableOpacity onPress={onPressItem}>
        <View style={styles.contentItem}>
          <Image
            style={{
              height: 100,
              width: 150,
              alignSelf: 'center',
            }}
            source={{
              uri: item.listphotos.find(element => element !== undefined),
            }}
            resizeMode="contain"
          />
        </View>
        <View>
          <View>
            <View paddingL-5 paddingR-20 marginB-11>
              <Text style={{fontSize:12}} marginT-10 numberOfLines={2} color={'#6f6f6f'} marginL-15>
                {item.name}
              </Text>
              <Text style={{fontSize:12}} color={'#7e7d7d'} marginL-20>
                {numberFormat.format(item.listedPrice)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemProduct;

const styles = StyleSheet.create({
  container: {
    width: widthScreen - 185,
    height: widthScreen - 210,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    borderColor:'#f5f5f5',
    borderWidth:1
  },
  contentItem: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    alignItems:'center',
    height: 100,
    width: 200,
  },
  // imgStyle: {
  //   height: 150,
  //   width: 150,
  //   justifyContent: 'center',
  // },
});
