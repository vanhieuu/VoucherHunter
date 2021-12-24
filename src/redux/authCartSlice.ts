import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export interface IProduct {
  _id: string;
  name: string;
  listedPrice: number;
  discountPrice: number;
  is_hot: boolean;
  listphotos: [];
  createdAt: string;
  updateAt: string;
  deletedAt: string;
  quantity: number;
  img: string;
  tags: [];
  description: string;
  sold: number;
  vote: number;
  supplier: string;
}

export enum EStatusAuth {
  check = 1,
  unauth = 2,
  auth = 3,
}
export interface IAuth {
  items: [
    {
      product_id: IProduct;
      quantity: number;
      _id: string;
      totalPrice: number;
    },
  ];
}

export interface IResProduct {
  success: boolean;
  message: string;
  product: IProduct[];
}

const initValue: IAuth = {
  items: [
    {
      product_id: {
        _id: '',
        name: '',
        listedPrice: 0,
        discountPrice: 0,
        is_hot: false,
        listphotos: [],
        createdAt: '',
        updateAt: '',
        deletedAt: '',
        quantity: 0,
        img: '',
        tags: [],
        description: '',
        sold: 0,
        vote: 0,
        supplier: '',
      },
      quantity: 0,
      _id: '',
      totalPrice: 0,
    },
  ],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initValue,
  reducers: {
    onAddToCart: (state, action: PayloadAction<IAuth>) => {
      const findIndex = state.items.findIndex(item => item.product_id._id);
      if (findIndex < 0) {
        state.items.push(...action.payload.items);
      }
      state.items = action.payload.items;
    },
    onUpdateQuantity: (state, action) => {
      const items = state.items.find(b => action.payload === b.product_id.name);
      const item = state.items.filter(
        b => action.payload !== b.product_id.name,
      );
      const findIndex = state.items.findIndex(item => item._id);
      if (findIndex < 0) {
        Alert.alert('Vui lòng chọn sản phẩm');
      }
      if (findIndex) {
        state.items[findIndex].quantity = state.items[findIndex].quantity + 1;
      }
    },

    removeFromCart: (state, action: PayloadAction<IAuth>) => {
      //  state.items =   {...state, item:state.items.filter((id)=> id._id === action.payload.id)}
      const findIndex = state.items.findIndex(item => item._id);
      const spilceCart = state.items.splice(findIndex, 1);
      state.items = action.payload.items;
    },
  },
});

export const saveCartAsync = (Cart: IAuth) => {
  try {
    AsyncStorage.setItem(
      'CartItems',
      JSON.stringify({
        items: Cart.items,
      }),
    );
  } catch (e) {
    // saving error
  }
};
export const getCartAsync = async () => {
  try {
    const Cart = await AsyncStorage.getItem('CartItems');
    if (Cart) {
      return JSON.parse(Cart);
    }
    return null;
  } catch (e) {
    // error reading value
    return null;
  }
};

export const {onAddToCart, onUpdateQuantity, removeFromCart} =
  CartSlice.actions;
export default CartSlice.reducer;
