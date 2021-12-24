import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Box from '../../../../components/Box';
import {Assets, Colors, Text, View} from 'react-native-ui-lib';

// import {useTheme} from '@shopify/restyle';
// import SwipeableRow from './SwipeableRow';
// import {Theme} from '../../../../components/theme';
// import {numberFormat} from '../../../../config/formatCurrency';
import {IProduct} from '../../../../types/IProduct';
import {numberFormat} from '../../../../config/formatCurrency';
import SwipeableRow from './SwipeableRow';
import Animated from 'react-native-reanimated';

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

const widthScreen = Dimensions.get('window').width;

// const Items = ({items, onDelete}: ItemProps) => {
//   console.log(items,'aaaa');
//   const theme = useTheme<Theme>();
//   return (
//     <SwipeableRow onDelete={onDelete} items={items}>
//       <Box padding="s" flexDirection="row">
//         <Box
//           style={{backgroundColor: Colors.primary}}
//           width={120}
//           height={120}
//           borderRadius="m">
//           <Image
//             source={{uri: items.product_id.img}}
//             style={{width: 120, height: 120}}
//             resizeMode="cover"
//           />
//         </Box>
//         <Box flex={1} justifyContent="center">
//           <Text
//             marginH-5
//             marginB-5
//             style={{
//               fontSize: 19,
//               fontWeight: 'bold',
//               color: '#000',
//             }}>
//             {items.product_id.name}
//           </Text>

//           <Text
//             style={{
//               fontSize: 15,
//               lineHeight: 22,
//               color: Colors.primary,
//               fontWeight: 'bold',
//             }}
//             marginH-15>
//             {numberFormat.format(items.product_id.discountPrice)}
//           </Text>
//         </Box>
//         <Box justifyContent="center" padding="s">
//           <Box
//             backgroundColor="secondary"
//             borderRadius="m"
//             height={theme.borderRadii.m * 3}
//             width={theme.borderRadii.m * 3}
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: 24,
//               height: 24,
//               borderRadius: 12,
//             }}>
//             <Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
//               {items.quantity}
//             </Text>
//           </Box>
//         </Box>
//       </Box>
//     </SwipeableRow>
//   );
// };

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

const Items = ({items, onDelete}: Props) => {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <ScrollView>
      <View style={styles.container}>
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
              setQuantity(prevQuantity => prevQuantity - 1);
            }}>
            <Image source={require('../../../../assets/minus.png')} />
          </TouchableOpacity>
          <Text style={styles.txtQuantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.btnPlus}
            //   onPress={() => setQuantity(quantity + 1)}
            onPress={() => setQuantity(prevQuantity => prevQuantity + 1)}>
            <Image source={require('../../../../assets/plus.png')} />
          </TouchableOpacity>
        
        </View>
        <View style={{ justifyContent: 'flex-start',top:widthScreen/20}}>
            <TouchableOpacity
              style={styles.btnDelete}
              //   onPress={() => setQuantity(quantity + 1)}
              onPress={onDelete}>
              <Image source={require('../../../../assets/plus.png')} />
            </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
  );
};

export default Items;
