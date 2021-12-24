import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import Animated from 'react-native-reanimated';
import {Colors, Text} from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import Box from '../../../components/Box';
import theme, {Theme} from '../../../components/theme';
import URL from '../../../config/Api';
import {RootStackParamList} from '../../../nav/RootStack';
import {saveCartAsync} from '../../../redux/authCartSlice';
import {RootState} from '../../../redux/store';
import {IProduct} from '../../../types/IProduct';
import CartContainer from './components/CartContainer';
import Items from './components/Items';

const {width} = Dimensions.get('window');
const height = 100 * (width / 375);
interface ICart {
  _id: string;
  product_id: IProduct;
  quantity: number;
  totalPrice: number;
}
interface Props {
  items: ICart;
}

const Cart = ({items}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme<Theme>();
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const [itemCart, setItemCart] = React.useState<ICart[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [mounted, setMounted] = React.useState<boolean>(false);

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
        setItemCart(json.cart.items);
        saveCartAsync(json);
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
  const onDelete = React.useCallback((item) => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!token) return;
    setMounted(true);
    fetch(URL.removeItem, {
      signal: signal,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer${token}`,
      },
      body: JSON.stringify({id: item._id}),
    })
      .then(response => response.json())
      .then(json => {
        setItemCart(json);
        console.log(json, 'aaa');
        // itemCart.splice(,1);
        // setItemCart(itemCart.concat());
        setLoading(false);
      });
  }, []);
  return (
    <CartContainer>
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
          {itemCart.map((item, index) => (
            <Items
              key={item._id}
              items={item}
              onDelete={() => {
                itemCart.splice(index, 1);
                setItemCart(itemCart.concat());
                console.log(item._id);
                onDelete(item._id)
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
    </CartContainer>
  );
};

export default Cart;

const styles = StyleSheet.create({
  containerItem: {
    width: 190,
    marginRight: 12,
    backgroundColor: Colors.white,
    elevation: 2,
  },
});
