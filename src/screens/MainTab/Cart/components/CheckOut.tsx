import {useTheme} from '@shopify/restyle';
import {debounce, method} from 'lodash';
import React from 'react';
import {Alert, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View, Colors} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';

import {Theme} from 'react-toastify';
import Box from '../../../../components/Box';
import URL from '../../../../config/Api';

import {numberFormat} from '../../../../config/formatCurrency';
import {
  IProduct,
  onAddToCart,
  onGetTotalPrice,
  onUpdateQuantity,
} from '../../../../redux/authCartSlice';
import {RootState} from '../../../../redux/store';

import AddCard from './AddCard';
import {getAuthAsync} from './AsynStoreCart';
import Card, {CardType} from './Card';

interface CheckOutProps {
  minHeight: number;
}

const cards = [
  {
    id: 0,
    type: CardType.VISA,
    last4Digits: '9012',
    expiration: '01/30',
  },

  {
    id: 1,
    type: CardType.COD,
    last4Digits: '∞',
    expiration: '∞',
  },
];

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

interface ICart {
  _id: string;
  product_id: IProduct;
  quantity: number;
  totalPrice: number;
}

const CheckOut = ({minHeight}: CheckOutProps) => {
  const [selectedCard, setSelectedCard] = React.useState(cards[0].id);
  // console.log(selectedCard === 0 ? 'Visa' : 'COD');
  const [card, setCard] = React.useState('');
  // selectedCard === 0 ? setCard('VISA'): setCard('COD')

  const [address, setAddress] = React.useState<addressProps>(initStateAddress);
  const addressDetail = JSON.stringify(address);
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const [itemCart, setItemCart] = React.useState<ICart[]>([]);
  // console.log(itemCart);
  // const [itemCarts, setItemCarts] = React.useState<ICart[]>([]);
  const [quantity, setQuantity] = React.useState<number>(0);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [price, setPrice] = React.useState<number>(0);

  const fetchApi = React.useCallback(async () => {
    loading;
    setMounted(true);
    const controller = new AbortController();
    const signal = controller.signal;
    if (!token) return;
    await fetch(URL.getItemCart, {
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
        setItemCart(json.cart.items);
        setPrice(json.cart.totalPrice);
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
      setMounted(false);
      controller.abort();
    };
  }, [selectedCard]);

  React.useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const onPressCheckOut = React.useCallback(async () => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    let dataToSend = {
      note: 'NoNote',
      deliveryAddress: addressDetail,
      paymentMethod: 'COD',
      items: itemCart,
    };
    await fetch(URL.createInvoice, {
      signal: signal,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(json => {
        Alert.alert(json.message);
      });
  }, []);


  // React.useEffect(() => {
  //   setLoading(true);
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   fetch(URL.removeAll, {
  //     signal: signal,
  //     method: 'DELETE',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       setItemCart(json.cart.items);
  //     });
  // }, [onPressCheckOut]);

  return (
    <Box
      flex={1}
      backgroundColor="background"
      padding="m"
      style={{paddingTop: minHeight}}>
      <Box flex={1} padding="m">
        <Box height={160}>
          <ScrollView horizontal>
            <AddCard />
            {cards.map(card => {
              return (
                <Card
                  key={card.id}
                  card={card}
                  selected={selectedCard === card.id}
                  onSelected={() => setSelectedCard(card.id)}
                />
              );
            })}
          </ScrollView>
        </Box>
        <Box marginTop="l">
          <Text color="#fff" h16 bold marginB-10>
            Địa chỉ giao hàng
          </Text>
          <Box flexDirection="row" opacity={0.5}>
            <Box flex={1} paddingVertical="m" opacity={0.5}>
              <Text color="#fff" h13>
                {address.number}
              </Text>
              <Text color="#fff" h13>
                {address.street}
              </Text>
              <Text color="#fff" h13>
                {address.city}
              </Text>
            </Box>
            <Box
              justifyContent="center"
              alignItems="center"
              paddingVertical="m">
              <TouchableOpacity>
                <Text color="#fff">Change</Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <Box flexDirection="row" paddingVertical="s">
            <Box flex={1}>
              <Text color="#fff" h16>
                Thanh toán
              </Text>
            </Box>
            <Box>
              <Text color={Colors.primary}>
                {/* {numberFormat.format(itemCart?.map((item)=>item.totalPrice).reduceRight((a,b) => a +b,0))} */}
                {numberFormat.format(price)}
              </Text>
            </Box>
          </Box>

          <View>
            <TouchableOpacity
              style={styles.btnDelete}
              //   onPress={() => setQuantity(quantity + 1)}
              onPress={onPressCheckOut}>
              <Text style={{fontSize: 20, lineHeight: 22}}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
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
});
