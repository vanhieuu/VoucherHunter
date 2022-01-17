import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Box from '../../../../components/Box';
import { Text, View} from 'react-native-ui-lib';
import {IProduct} from '../../../../types/IProduct';
import {numberFormat} from '../../../../config/formatCurrency';

import URL from '../../../../config/Api';
import { useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {saveAuthAsync} from './AsynStoreCart';
import { onGetQuantity } from '../../../../redux/authCartSlice';
interface ICart {
  _id: string;
  product_id: IProduct;
  quantity: number;
  totalPrice: number;
}

interface Props {
  items: ICart;
  onDelete: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 5,
    marginVertical: 20,
    backgroundColor: '#FFF',

    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    marginHorizontal: 16,
    flex: 1,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtName: {
    fontSize: 16,
    color: '#09051C',
    fontWeight: '700',
    marginBottom: 4,
  },
  txtDes: {
    fontSize: 14,
    color: 'rgba(59, 59, 59, .3)',
  },
  txtPrice: {
    color: '#E9707D',
    fontSize: 19,
  },
  btnMinus: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(83,232,139,.1)',
  },
  btnPlus: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#E9707D',
  },
  btnDelete: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#E97',
  },
  txtQuantity: {
    fontSize: 16,
    width: 40,
    textAlign: 'center',
  },
});
const widthScreen = Dimensions.get('window').width;

const Items = ({items, onDelete}: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [quantity, setQuantity] = React.useState(items.quantity);
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const [itemQuantity, setItemQuantity] = React.useState<ICart[]>([]);
  

  const putQuantity = React.useCallback(() => {
    const controller = new AbortController();

    setLoading(true);
    fetch(URL.addQuantity, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: items._id,
        quantity: quantity,
      }),
    })
      .then(response => response.json())
      .then(json => {
        // dispatch(onUpdateQuantity(json.cart.items));
        
       
        setItemQuantity(json.cart.items);

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
  }, [quantity]);

  React.useEffect(() => {
    putQuantity();
  }, [putQuantity]);

  return (
    <Box style={styles.container}>
      <Image
        source={{uri: items.product_id.img}}
        style={{width: 70, height: 70}}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={styles.txtName} numberOfLines={1}>
          {items.product_id.name}
        </Text>
        <Text style={styles.txtDes}>{items.product_id.supplier}</Text>
        <Text style={styles.txtPrice}>
          {numberFormat.format(items.product_id.discountPrice)}
        </Text>
      </View>
      <View style={styles.quantity}>
        <TouchableOpacity
          style={styles.btnMinus}
          //   onPress={() => setQuantity(quantity - 1)}
          onPress={() => {
            setQuantity(prev => prev - 1);
            putQuantity();

          }}>
          <Image source={require('../../../../assets/minus.png')} />
        </TouchableOpacity>
        <Text style={styles.txtQuantity}>{quantity}</Text>
        <TouchableOpacity
          style={styles.btnPlus}
          //   onPress={() => setQuantity(quantity + 1)}
          onPress={() => {
            setQuantity(prev => prev + 1);
            putQuantity();
          }}>
          <Image source={require('../../../../assets/plus.png')} />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'flex-start', top: widthScreen / 20}}>
        <TouchableOpacity
          style={styles.btnDelete}
          //   onPress={() => setQuantity(quantity + 1)}
          onPress={onDelete}>
          <Image
            source={require('../../../../assets/Trash.png')}
            style={{width: 20, height: 20}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </Box>
  );
};

export default Items;
