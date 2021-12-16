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
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const quantity = useSelector<RootState, number>(
    state => state.product.quantity,
  );

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
        // console.log(json.cart.items)
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

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
      <ScrollView contentContainerStyle={styles.content}>
        {itemCart.map((product_id, _id) => {
          return (
            <CartCard
              key={_id}
              _id={product_id.id}
              name={product_id.product_id.name}
              listedPrice={product_id.product_id.discountPrice}
              discountPrice={product_id.product_id.discountPrice}
              is_hot={false}
              listphotos={[]}
              createdAt={''}
              updateAt={''}
              deletedAt={''}
              quantity={product_id.quantity}
              img={product_id.product_id.img}
              tags={[]}
              description={''}
              sold={0}
              vote={0}
              supplier={''}
            />
          );
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
              {numberFormat.format(
                itemCart
                  .map(item => item.product_id.discountPrice)
                  .reduceRight((a, b) => (a + b))   ,
              )}
            </Text>
          </View>

        </View>
      </ScrollView>
      <View flex marginH-60 marginT-100>
        <Button label={'CheckOut'} />
      </View>
    </SafeAreaView>

    // <SafeAreaView style={styles.container}>
    //   <Header
    //     placement="center"
    //     centerComponent={{
    //       text: 'Shopping',
    //       style: {color: Colors.primary, fontSize: 20},
    //     }}
    //     containerStyle={{
    //       backgroundColor: 'white',
    //       justifyContent: 'space-around',
    //     }}
    //     barStyle="light-content"
    //     statusBarProps={{barStyle: 'light-content'}}
    //   />
    //   <ScrollView contentContainerStyle={styles.content}>
    //     {/* <ItemCart />; */}
    //     <View style={styles.totalSection}>
    //       <Text h28 black>
    //         {' '}
    //         Tổng cộng
    //       </Text>
    //       <View row center style={{justifyContent: 'space-between'}}>
    //         <View style={styles.divider} />
    //         <Text h18 color={Colors.black}>
    //           {' '}
    //           {item.discountPrice}
    //         </Text>
    //       </View>
    //       <View row center style={{justifyContent: 'space-between'}}>
    //         <Text h24 color={Colors.primary}>
    //           Service Fee
    //         </Text>
    //         <View style={styles.divider} />
    //         <Text h18 black>
    //           {' '}
    //           0
    //         </Text>
    //       </View>
    //       <View flex marginH-24 marginV-20>
    //         <Button label={'CheckOut'} />
    //       </View>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
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
});
