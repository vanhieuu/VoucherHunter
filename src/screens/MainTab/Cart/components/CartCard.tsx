import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {Text, View, Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IProduct} from '../../../../types/IProduct';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {onUpdateQuantity} from '../../../../redux/authProductSlice';
import {numberFormat} from '../../../../config/formatCurrency';
import {
  addToCart,
  decreaseCart,
  removeFromCart,
} from '../../../../redux/authCartSlice';

interface Props extends IProduct {}
const CartCard = ({name, img, discountPrice,_id}: Props) => {

  const dispatch = useDispatch();
  const [quantity,setQuantity] = React.useState(0)
  const handleRemoveFromCart = React.useCallback(({item}:{item:IProduct}) => {
    dispatch(removeFromCart(item));
  }, []);

 

  const handleDecreaseCart = React.useCallback(product => {
    dispatch(decreaseCart(product));
  }, []);

  return (
    <View row center>
      <View row center>
        <View style={styles.image}>
          <Image source={{uri: img}} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.titleSection}>
          <Text h17 numberOfLines={name.length} style={{maxWidth: 120}}>
            {name}
          </Text>
          <View row center style={styles.action}>
            <Text style={styles.quantityUpdate} onPress={handleDecreaseCart}>
              -
            </Text>
            <Text style={{fontWeight: 'bold'}} h17> 
              {quantity}
            </Text>
            <Text style={styles.quantityUpdate} onPress={()=>{
              setQuantity(quantity + 1)
              console.log(_id)
            }}>
              +
            </Text>
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <Text h18 color={Colors.primary} marginB-20 marginL-20>
          {numberFormat.format(discountPrice)}
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
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 80,
    backgroundColor: Colors.primary,
    borderWidth: 0,
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
