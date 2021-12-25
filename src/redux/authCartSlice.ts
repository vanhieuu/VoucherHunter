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
  product_id: IProduct;
  quantity: number;
  _id: string;
  totalPrice: number;
  numberItemsCart: number;
}

export interface IResProduct {
  success: boolean;
  message: string;
  product: IProduct[];
}

const initValue: IAuth = {
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
  numberItemsCart: 0,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initValue,
  reducers: {
    onAddToCart: (state, action: PayloadAction<IAuth>) => {
      state.product_id = action.payload.product_id;
      state._id = action.payload._id;
      state.quantity = 1;
      state.totalPrice = action.payload.totalPrice;
      state.numberItemsCart = 1;
    },
    onUpdateQuantity: (state, action) => {
      if (state.quantity === state.quantity - 1) {
        state.quantity = action.payload.quantity;
        state.product_id = action.payload.product_id;
        state._id = action.payload._id;
        state.totalPrice = action.payload.totalPrice;

        state.numberItemsCart--;
      }
      if (state.quantity === state.quantity + 1) {
        state.quantity = action.payload.quantity;
        state.product_id = action.payload.product_id;
        state._id = action.payload._id;
        state.totalPrice = action.payload.totalPrice;
        state.numberItemsCart++;
      }
    },

    removeFromCart: (state, action: PayloadAction<IAuth>) => {
      state.product_id = action.payload.product_id;
      state._id = action.payload._id;
      state.quantity = 1;
      state.totalPrice = action.payload.totalPrice;
      state.numberItemsCart = 0;
      //  state.items =   {...state, item:state.items.filter((id)=> id._id === action.payload.id)}
    },
  },
});

export const {onAddToCart, onUpdateQuantity, removeFromCart} =
  CartSlice.actions;
export default CartSlice.reducer;
