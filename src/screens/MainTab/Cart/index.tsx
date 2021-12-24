import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';
import {debounce} from 'lodash';
import React from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import {Card, Colors, Text, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import Box from '../../../components/Box';
import theme, {Theme} from '../../../components/theme';
import URL from '../../../config/Api';
import {RootStackParamList} from '../../../nav/RootStack';
import {
  onAddToCart,
  removeFromCart,
  saveCartAsync,
} from '../../../redux/authCartSlice';
import {RootState} from '../../../redux/store';
import {IProduct} from '../../../types/IProduct';

import CartContainer from './components/CartContainer';
import Footer, {RefFooter} from './components/Footer';
import Items from './components/Items';
const {width} = Dimensions.get('window');
const height = (682 * width) / 375;
const minHeigt = (282 * width) / 375;

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
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme<Theme>();
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const [itemCart, setItemCart] = React.useState<ICart[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const refListOrder = React.useRef<FlatList>(null);
  const refFooter = React.useRef<RefFooter>(null);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const onEndReached = React.useCallback(() => {
    refFooter.current?.setIsLoadmore(true);
    setTimeout(() => {
      setItemCart(prev => prev.concat());
      refFooter.current?.setIsLoadmore(false);
    }, 500);
  }, []);

  const renderListFooter = React.useCallback(() => {
    return <Footer ref={refFooter} />;
  }, []);

  const renderItem = React.useCallback(({item,index}) => {
    return (
      <Items
        items={item}
        onDelete={debounce(() => {
          itemCart.splice(index,1)
          itemCart.concat()
        }, 1000)}
      />
    );
  }, []);

  const keyExtractor = React.useCallback(
    (items, index) => index.toString(),
    [],
  );

  const onDelete = React.useCallback(debounce(() => {
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
      body: JSON.stringify({id: items._id}),
    })
      .then(response => response.json())
      .then(json => {
        setItemCart(json);
        setLoading(false);
      });
  },2000), []);

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

  return (
    <CartContainer>
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
      <Box flex={1}>
        <View
          style={{
            borderBottomRightRadius: theme.borderRadii.xl,
            borderBottomLeftRadius: theme.borderRadii.xl,
          }}>
          {loading ? (
            <View row paddingH-16 paddingV-12>
              <Card
                style={[
                  styles.containerItem,
                  {height: 251, backgroundColor: Colors.dark40},
                ]}
              />
              <Card
                style={[
                  styles.containerItem,
                  {height: 251, backgroundColor: Colors.dark40},
                ]}
              />
              <Card
                style={[
                  styles.containerItem,
                  {height: 210, backgroundColor: Colors.dark40},
                ]}
              />
            </View>
          ) : (
            <FlatList
              ref={refListOrder}
              horizontal={false}
              showsHorizontalScrollIndicator={true}
              data={itemCart}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
              onEndReachedThreshold={0.5}
              // onEndReached={onEndReached}
              ListFooterComponent={renderListFooter}
              renderItem={renderItem}
            />
          )}
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
    backgroundColor: Colors.white,
    elevation: 2,
  },
});
