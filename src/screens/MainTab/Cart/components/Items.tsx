import React from 'react';
import {Dimensions, Image, ImageSourcePropType, StyleSheet} from 'react-native';
import Box from '../../../../components/Box';
import {Colors, Text, View} from 'react-native-ui-lib';

import {useTheme} from '@shopify/restyle';
import SwipeableRow from './SwipeableRow';
import {Theme} from '../../../../components/theme';
import {numberFormat} from '../../../../config/formatCurrency';
import {IProduct} from '../../../../types/IProduct';

interface ICart {
  _id: string;
  product_id: IProduct;
  quantity: number;
  totalPrice: number;
}

interface ItemProps {
  items: ICart;
  onDelete: () => void;
}

const widthScreen = Dimensions.get('window').width;

const Items = ({items, onDelete}: ItemProps) => {
  console.log(items,'aaaa');
  const theme = useTheme<Theme>();
  return (
    <SwipeableRow onDelete={onDelete} items={items}>
      <Box padding="s" flexDirection="row">
        <Box
          style={{backgroundColor: Colors.primary}}
          width={120}
          height={120}
          borderRadius="m">
          <Image
            source={{uri: items.product_id.img}}
            style={{width: 120, height: 120}}
            resizeMode="cover"
          />
        </Box>
        <Box flex={1} justifyContent="center">
          <Text
            marginH-5
            marginB-5
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: '#000',
            }}>
            {items.product_id.name}
          </Text>

          <Text
            style={{
              fontSize: 15,
              lineHeight: 22,
              color: Colors.primary,
              fontWeight: 'bold',
            }}
            marginH-15>
            {numberFormat.format(items.product_id.discountPrice)}
          </Text>
        </Box>
        <Box justifyContent="center" padding="s">
          <Box
            backgroundColor="secondary"
            borderRadius="m"
            height={theme.borderRadii.m * 3}
            width={theme.borderRadii.m * 3}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 24,
              height: 24,
              borderRadius: 12,
            }}>
            <Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
              {items.quantity}
            </Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  );
};

export default Items;

const styles = StyleSheet.create({});
