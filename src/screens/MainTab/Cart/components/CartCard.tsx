import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { Text, View, Colors } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IProduct } from '../../../../types/IProduct';

import { numberFormat } from '../../../../config/formatCurrency';
import { useSelector } from 'react-redux';
import URL from '../../../../config/Api';
import { RootState } from '../../../../redux/store';

export interface ICart {
  id: string;
  product_id: IProduct;
  quantity: number;
  totalPrice: number;
}
interface Props extends IProduct { }
const CartCard = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [itemCart, setItemCart] = React.useState<ICart[]>([]);
  const [cart, setCart] = React.useState<ICart>();
  const token = useSelector<RootState, string>(state => state.auth.accessToken);


  React.useEffect(() => {
    if (!token) return;
    fetch(URL.getItemCart, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        setItemCart(json.cart.items);
        setLoading(false);
        setCart(json.cart)
        
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }, []);


  return (
    <View center>
      {itemCart.map((item, index) => {
        return (
          <>
            <View row center key={index}>
              <View style={styles.image}>
                <Image source={{ uri: item.product_id.img }} style={styles.image} resizeMode="cover" />
              </View>
              <View style={styles.titleSection}>
                <Text h17 numberOfLines={item.product_id.name.length} style={{ maxWidth: 120 }}>
                  {item.product_id.name}
                </Text>
                <View row center style={styles.action}>
                  <Text style={styles.quantityUpdate} onPress={() => { setQuantity(quantity - 1) }}>
                    -
                  </Text>
                  <Text style={{ fontWeight: 'bold' }} h17>
                    {quantity}
                  </Text>
                  <Text style={styles.quantityUpdate} onPress={() => { setQuantity(quantity + 1) }}>
                    +
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ justifyContent: 'space-between' }}>
              <Text h18 color={Colors.primary} marginB-20 marginL-21>
                {numberFormat.format(item.product_id.discountPrice * quantity)}
              </Text>
              <View center style={styles.delete}>
                <Icon
                  color={'white'}
                  size={15}
                  name="trash"
                // onPress={handleRemoveFromCart}
                />
              </View>
            </View>
          </>
        )
      })}

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
    width: 100,
    height: 80,
    backgroundColor: Colors.primary,
    borderWidth: 0,
    marginBottom: 10,
  },
  titleSection: {
    paddingLeft: 30,
  },
  action: {
    width: 100,
    height: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  delete: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderColor: '#ffff',
    borderWidth: 1,
    backgroundColor: '#ff3d00',
    marginHorizontal: 50,
  },
  quantityUpdate: {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    fontSize: 22,
    borderRadius: 10,
    alignSelf: 'center',
    textAlign: 'center',
    width: 20,
  },
});
