
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IProduct} from '../../../../types/IProduct';

interface ICart {
    _id: string;
    product_id: IProduct;
    quantity: number;
    totalPrice: number;
  }

export const saveAuthAsync = (cart: ICart) => {
    try {
      AsyncStorage.setItem('VoucherHunterCart', JSON.stringify(cart));
    } catch (e) {
      // saving error
    }
  };
  export const getAuthAsync = async () => {
    try {
      const cart = await AsyncStorage.getItem('VoucherHunterCart');
      if (cart) {
        return JSON.parse(cart) ;
       
      }
      return null;
    } catch (e) {
      // error reading value
      return null;
    }
  };