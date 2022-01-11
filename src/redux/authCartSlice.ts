import {createSlice, PayloadAction} from '@reduxjs/toolkit';



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
  numberCart: number;
  _id: string;
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
  numberCart: 0,
  _id: '',
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
    onGetNumberCart: (
      state,
      action: PayloadAction<{numberItemsCart: number}>,
    ) => {
      state.numberCart = action.payload.numberItemsCart;
    },
  },
});

export const {onGetNumberCart} = CartSlice.actions;
export default CartSlice.reducer;
