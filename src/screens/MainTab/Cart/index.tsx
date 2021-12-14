import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  FlatList,
} from 'react-native';
import {Header} from 'react-native-elements';

import {Button, Colors} from 'react-native-ui-lib';
import {View, Text, Image} from 'react-native-ui-lib';
import {RootState} from '../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../../config/Api';
import {IProduct} from '../../../types/IProduct';
import ItemCart from './components/ItemCart';
import {IItemCart, IResCart} from '../../../types/ItemCart';
import {onGetProduct} from '../../../redux/authProductSlice';
import {onGetCart} from '../../../redux/authCartSlice';

const Cart = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [itemCart, setItemCart] = React.useState<IItemCart>();
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
        setItemCart(json);
        setLoading(false);
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <View flex>
      <Text h20 red>
        {itemCart?.cart.items.map((product_id, id) => {
          <View>
            <Text key={id}>{product_id.product_id.description}</Text>
          </View>;
          console.log(product_id.product_id.description);
        })}
      </Text>
    </View>

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
