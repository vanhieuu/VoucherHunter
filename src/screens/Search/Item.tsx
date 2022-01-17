import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {IProduct} from '../../types/IProduct';

const Item = ({item}: {item: IProduct}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
        alignSelf: 'center',
      }}
      marginH-20>
      <TouchableOpacity>
        <Image
          source={{uri: item.listphotos.find(element => element !== undefined)}}
          width={120}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          height={100}
        />
        <Text h10 paddingH-12 paddingV-15 style={{maxWidth: 150}}>
          {item.name.toUpperCase()}
        </Text>
        <Text h10 paddingH-15 paddingV-15>
          {item.listedPrice}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({});
