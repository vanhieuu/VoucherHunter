import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'react-native-elements';
import {Colors, Text, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import Box from '../../../components/Box';
import {Theme} from '../../../components/theme';
import URL from '../../../config/Api';
import {RootStackParamList} from '../../../nav/RootStack';
import {onGetNumberCart} from '../../../redux/authCartSlice';
import {IAuthRegister} from '../../../redux/authRegisterSlice';
import {getAuthAsync, IAuth} from '../../../redux/authSlice';
import {RootState} from '../../../redux/store';
import {IProduct} from '../../../types/IProduct';
import CartContainer from './components/CartContainer';
import CheckOut from './components/CheckOut';
import Items from './components/Items';

const {width} = Dimensions.get('window');
const height = 120 * (width / 375);
interface ICart {
  _id: string;
  product_id: IProduct;
  quantity: number;
  totalPrice: number;
}
interface CheckOut {
  _id: string;
  product_id: string;
  quantity: number;
  totalPrice: number;
}
interface Props {
  items: ICart;
}
interface addressProps {
  number: string;
  city: string;
  street: string;
}

const initStateAddress: addressProps = {
  number: '23 ngách 17/2',
  city: 'Hà Nội',
  street: 'Nguyễn Văn Lộc',
};

const Cart = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme<Theme>();

  const [address, setAddress] = React.useState<addressProps>(initStateAddress);
  const addressDetail = JSON.stringify(address);
  
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const [itemCart, setItemCart] = React.useState<ICart[]>([]);

  const [itemSend, setItemSend] = React.useState<ICart[]>([]);

  const numberCart = useSelector<RootState, number>(
    state => state.cart.numberCart,
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!token) return;
    fetch(URL.getItemCart, {
      signal: signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        setItemCart(json.cart.items)
        setItemSend(json.cart.items);
        setLoading(false);
        dispatch(onGetNumberCart({numberItemsCart: itemCart.length}));
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('Success Abort');
        } else {
          console.error(err);
        }
      });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [numberCart]);

  // React.useEffect(() => {
  //   const ac = new AbortController();
  //   fetchApi();
  //   return () => ac.abort();
  // }, [numberCart]);

  const onPressCheckOut = async () => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    await  itemSend.forEach(item => {
      setItemSend((item.product_id = item.product_id._id));
    });
    
    fetch(URL.createInvoice, {
      signal: signal,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        note: 'NOthing',
        deliveryAddress: addressDetail,
        paymentMethod: 'COD',
        items: itemSend,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (itemCart.length === 0) {
          Alert.alert('Vui lòng chọn sản phẩm');
          
        } else {
          Alert.alert(json.message, 'Alert');
        }
      });
  };

  const onDelete = React.useCallback(async _id => {
    const controller = new AbortController();
    const auth: IAuth | null = await getAuthAsync();
    const registerAuth: IAuthRegister | null = await getAuthAsync();
    const signal = controller.signal;
    await fetch(URL.removeItem, {
      signal: signal,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          auth?.accessToken || registerAuth?.accessToken
        }`,
      },
      body: JSON.stringify({id: _id}),
    })
      .then(response => response.json())
      .then(json => {
        // setItemCart([...itemCart,json.cart.items])
        setItemCart(json.cart.items);
        dispatch(
          onGetNumberCart({
            numberItemsCart: numberCart === 0 ? numberCart : numberCart - 1,
          }),
        );
        // dispatch(removeFromCart(json.cart.items))
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('Success Abort');
        } else {
          console.error(err);
        }
      });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, []);
  return (
    <CartContainer CheckOutComponent={CheckOut}>
      <Box>
        <Box backgroundColor="primary">
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
            leftComponent={{
              icon: 'arrow-left',
              onPress: () => navigation.goBack(),
            }}
          />
        </Box>
      </Box>
      <Box flex={1}>
        <ScrollView
          style={{
            borderBottomRightRadius: theme.borderRadii.xl,
            borderBottomLeftRadius: theme.borderRadii.xl,
          }}
          contentContainerStyle={{paddingVertical: 50 * (width / 375)}}
          showsVerticalScrollIndicator={false}>
          {itemCart.map((items, index) => (
            <Items
              key={index}
              items={items}
              onDelete={() => {
                itemCart.splice(index, 1);
                setItemCart(itemCart.concat());
                onDelete(items._id);
              }}
            />
          ))}
        </ScrollView>

        <Box
          width={width}
          height={height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: Colors.primary,
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: 20,
              marginTop: 5,
            }}></Text>
        </Box>
      </Box>
      <Box
        justifyContent="center"
        alignContent="center"
        alignSelf="center"
        marginBottom="m">
        <View flex-end width-120>
          <TouchableOpacity
            style={styles.btnCheckout}
            onPress={onPressCheckOut}>
            <Text style={{fontSize: 20, lineHeight: 22}}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </Box>
    </CartContainer>
  );
};

export default Cart;

const styles = StyleSheet.create({
  containerItem: {
    width: 190,
    marginRight: 12,
    backgroundColor: Colors.black,
    elevation: 2,
  },

  btnDelete: {
    backgroundColor: '#E9707D',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
    width: '90%',
    marginVertical: 10,
    borderWidth: 0,
    marginHorizontal: 20,
  },
  containerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnCheckout: {
    backgroundColor: '#E9707D',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
    width: '100%',
    marginVertical: 5,
    borderWidth: 0,
    marginHorizontal: 10,
  },
});
