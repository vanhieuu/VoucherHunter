import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {View, Text, Colors, Button} from 'react-native-ui-lib';
import {RootState} from '../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../../config/Api';
import {IItemCart} from '../../../types/ItemCart';
import {Header} from 'react-native-elements';
import CartCard from './components/CartCard';
import {numberFormat} from '../../../config/formatCurrency';
import {getTotals} from '../../../redux/authCartSlice';

const Cart = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [itemCart, setItemCart] = React.useState<IItemCart>();
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const quantity = useSelector<RootState, number>(
    state => state.product.quantity,
  );
  const cart = useSelector<RootState>(state => state.cart);
  const dispatch = useDispatch();

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
        setItemCart(json);
        setLoading(false);

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
          style: {color: Colors.primary, fontSize: 20},
        }}
        containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'space-around',
        }}
        barStyle="light-content"
        statusBarProps={{barStyle: 'light-content'}}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {itemCart?.cart.items.map((product_id, index) => {
          return (
            <CartCard
              key={index}
              _id={product_id._id}
              name={product_id.product_id.name}
              discountPrice={product_id.product_id.discountPrice}
              is_hot={false}
              listphotos={[]}
              createdAt={''}
              updateAt={''}
              deletedAt={''}
              quantity={quantity}
              img={product_id.product_id.img}
              tags={[]}
              description={''}
              sold={0}
              vote={0}
              supplier={''}
              listedPrice={0}
            />
          );
        })}

        <View style={styles.totalSection}>
          <Text h28 black>
            {' '}
            Thanh toán
          </Text>
          <View row center style={{justifyContent: 'space-between'}}>
            <Text h24 color={Colors.primary}>
              Thành tiền
            </Text>
            <View style={styles.divider} />
            <Text h18 color={Colors.black}>
              {0}
            </Text>
          </View>
          <View flex marginH-60 marginT-100>
            <Button label={'CheckOut'} />
          </View>
        </View>
      </ScrollView>
      <View flex>
        <Text h20 black></Text>
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
