import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { View, Text, Colors, Button, Image } from 'react-native-ui-lib';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import URL from '../../../config/Api';
import { IItemCart } from '../../../types/ItemCart';
import { Header } from 'react-native-elements';
import CartCard from './components/CartCard';
import { IProduct } from '../../../types/IProduct';
import { numberFormat } from '../../../config/formatCurrency';
import { onDecreaseQuantity, onIncreaseQuantity } from '../../../redux/authCartSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface IResCart {
  cart: {
    items: ICart;
  };
}
export interface ICart {
  id: string;
  product_id: IProduct;
  quantity: number;
  totalPrice: number;
}

const Cart = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [itemCart, setItemCart] = React.useState<ICart[]>([]);
  const [cart, setCart] = React.useState<ICart>();
  const [quantity, setQuantity] = React.useState(1)
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  // const quantity = useSelector<RootState, number>(state => state.cart.quantity);
  // console.log(quantity)
  const dispatch = useDispatch()
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
        console.log(json.cart)
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const onHandleDecreseQuantity = React.useCallback(() => {
    dispatch(onDecreaseQuantity(quantity))
    console.log(quantity)

  }, [])

  const onHandleIncreseQuantity = React.useCallback(() => {
    dispatch(onIncreaseQuantity(quantity))
    setQuantity(quantity + 1)
    console.log(quantity)

  }, [])




  return (
    <SafeAreaView style={styles.container}>

      <Header
        placement="center"
        centerComponent={{
          text: 'Shopping',
          style: { color: Colors.primary, fontSize: 20 },
        }}
        containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'space-around',
        }}
        barStyle="light-content"
        statusBarProps={{ barStyle: 'light-content' }}
      />



      <ScrollView


      >
        {itemCart.map((item, index) => {
          return (
            <View row center key={index}>
              <View row center>
                <View >
                  <Image source={{ uri: item.product_id.img }} style={[styles.image]} resizeMode="cover" />
                </View>
                <View style={styles.titleSection}>
                  <Text h17 numberOfLines={item.product_id.name.length} style={{ maxWidth: 120 }}>
                    {item.product_id.name}
                  </Text>
                  <View row center style={styles.action}>
                    <Text style={styles.quantityUpdate} onPress={onHandleDecreseQuantity}>
                      -
                    </Text>
                    <Text style={{ fontWeight: 'bold' }} h17>
                      {item.quantity}
                    </Text>
                    <Text style={styles.quantityUpdate} onPress={onHandleIncreseQuantity}>
                      +
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <Text h18 color={Colors.primary} marginB-20 marginL-21>
                  {numberFormat.format(item.product_id.discountPrice * item.quantity)}
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
            </View>

          )
        })}


        <View style={styles.totalSection}>
          <Text h28 black>
            {' '}
            Thanh toán
          </Text>
          <View row center style={{ justifyContent: 'space-between' }}>
            <Text h24 color={Colors.primary}>
              Thành tiền
            </Text>
            <View style={styles.divider} />
            <Text h17 color={Colors.black} marginR-15>
              {numberFormat.format(cart?.totalPrice!)}

            </Text>
          </View>
        </View>
      </ScrollView>
      <View >
        <Button label={'Thanh toán'} />
      </View>
    </SafeAreaView>


  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    marginHorizontal: 29,
    paddingBottom: 32,
  },
  totalSection: {
    marginTop: 32,
  },
  divider: {
    height: 1,
    borderColor: '#fdd',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderStyle: 'solid',
    marginHorizontal: 16,
    marginTop: 5,
  },
  container1: {
    justifyContent: 'space-between',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: Colors.primary,
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
