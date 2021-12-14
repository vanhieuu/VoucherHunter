import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../../../nav/RootStack';
import {Text, View, Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {onUpdateQuantity} from '../../../../redux/authProductSlice';
import {MainTabParamList} from '../../../../nav/MainTab';
import { IProduct } from '../../../../types/IProduct';
import { numberFormat } from '../../../../config/formatCurrency';









const CartCard = ({item}: {item:IProduct}) => {
  const route = useRoute<RouteProp<MainTabParamList, 'Cart'>>();
  const product = route.params.item;
  const quantity = useSelector<RootState, number>(
    state => state.product.quantity,
  );
  const dispatch = useDispatch();
  return (
    <View row center style={styles.container}>
      <View row center>
        <View style={styles.image}>
          <Image
            source={{uri: product.img}}
            style={styles.image}
            resizeMode="center"
          />
        </View>
        <View style={styles.titleSection}>
          <Text h24>{item.name}</Text>

          <View row center style={styles.action}>
            <Text
              h17
              style={{fontWeight: 'bold'}}
              onPress={() => {
                dispatch(onUpdateQuantity({quantity: quantity - 1}));
              }}>
              -
            </Text>
            <Text style={{fontWeight: 'bold'}} h17>
              {dispatch(onUpdateQuantity({quantity: quantity}))}
            </Text>
            <Text
              h17
              style={{fontWeight: 'bold'}}
              onPress={() => {
                dispatch(onUpdateQuantity({quantity: quantity + 1}));
              }}>
              +
            </Text>
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <Text h18 color={Colors.primary} marginB-20>
          {numberFormat.format(product?.discountPrice)}
        </Text>
        <View center style={styles.delete}>
          <Icon color={'white'} size={15} name="trash" />
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginTop: 20,
  },
  image: {
    width: 124,
    height: 121,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    borderColor: '#c5c2c2',
    borderWidth: 1,
  },
  titleSection: {
    marginLeft: 16,
  },
  action: {
    width: 100,
    height: 35,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.06)',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  delete: {
    width: 50,
    height: 50,
    borderRadius: 20,
    borderColor: '#ffff',
    borderWidth: 1,
    backgroundColor: '#ff3d00',
  },
});
