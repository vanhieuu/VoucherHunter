import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../../../config/Api';
import {onUpdateQuantity} from '../../../../redux/authProductSlice';
import {RootState} from '../../../../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IProduct} from '../../../../types/IProduct';
import {View, Text, Colors, Image} from 'react-native-ui-lib';
import {numberFormat} from '../../../../config/formatCurrency';
interface Props {
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

const ItemCart = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [itemCart, setItemCart] = React.useState<IProduct>();
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const quantity = useSelector<RootState, number>(
    state => state.product.quantity,
  );
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
    <View row center style={styles.container}>
      <View row center>
        <View style={styles.image}>
          <Image
            source={{uri: itemCart?.img}}
            style={styles.image}
            resizeMode="center"
          />
        </View>
        <View style={styles.titleSection}>
          <Text h24>{itemCart?.name}</Text>

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
          {numberFormat.format(itemCart?.discountPrice!)}
        </Text>
        <View center style={styles.delete}>
          <Icon color={'white'} size={15} name="trash" />
        </View>
      </View>
    </View>
  );
};

export default ItemCart;

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
