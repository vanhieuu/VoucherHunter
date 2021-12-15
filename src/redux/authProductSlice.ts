import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IProduct {
  _id: string;
  name: string;
  listedPrice: number;
  discountPrice: number;
  is_hot: boolean;
  listphotos: [];
  created_at: string;
  updated_at: string;
  deleted_at: string;
  quantity: number;
  tags: [];
  description: [];
  img: string;
}

export enum EStatusAuth {
  check = 1,
  unauth = 2,
  auth = 3,
}

export interface IAuth {
  productId: IProduct[];
  message: string;
  statusAuth: EStatusAuth;
  quantity: number;
  total: number;
}

export interface IResProduct {
  success: boolean;
  message: string;
  product: IProduct[];
}

const initValue: IAuth = {
  productId: [
    {
      _id: '',
      name: '',
      listedPrice: 0,
      discountPrice: 0,
      is_hot: false,
      listphotos: [],
      created_at: '',
      updated_at: '',
      deleted_at: '',
      quantity: 0,
      tags: [],
      description: [],
      img: '',
    },
  ],
  message: '',
  statusAuth: EStatusAuth.check,
  quantity: 0,
  total: 0,
};
export const productSlice = createSlice({
  name: 'product',
  initialState: initValue,
  reducers: {
    onGetProduct: (state, action: PayloadAction<IAuth>) => {
      state.productId = action.payload.productId;
      state.message = action.payload.message;
      state.statusAuth = EStatusAuth.auth;
    },

    updateStatusAuth: (
      state,
      action: PayloadAction<{statusAuth: EStatusAuth}>,
    ) => {
      state.statusAuth = action.payload.statusAuth;
    },

    onUpdateQuantity: (state, action: PayloadAction<IProduct>) => {
      const existedItem = state.productId.filter(
        cartItem => cartItem._id === action.payload._id,
      );
      existedItem[0].quantity = action.payload.quantity;
      state.quantity = action.payload.quantity;
    },
  },
});
export const {onGetProduct, updateStatusAuth, onUpdateQuantity} =
  productSlice.actions;
export default productSlice.reducer;
