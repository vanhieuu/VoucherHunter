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
export interface IItemCart {
  items: [
    {
      product_id: IProduct;
      quantity: number;
      totalPrice: number;
      _id: string;
    },
  ];
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
  quantity: number;
  numberCart: number;
}

export interface IResProduct {
  success: boolean;
  message: string;
  product: IProduct[];
}

const initValue: IAuth = {
  numberCart: 0,
  quantity: 1,
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
    onAddToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload.id,
      );
      console.log(itemIndex);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        const tempProduct = {...action.payload, quantity: 1};
        state.items.push(tempProduct);
      }
    },
    onIncreaseQuantity: (state, action: PayloadAction<IAuth>) => {
      state.numberCart++;
      state.items.length;
    },
    onDecreaseQuantity: (state, action: PayloadAction<IAuth>) => {
      state.numberCart--;
      state.items = action.payload.items;
    },
    onGetCartNumber: (state, action: PayloadAction<{cart: number}>) => {
      state.numberCart = action.payload.cart;
    },
  },
});

export const {
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onGetCartNumber,
} = CartSlice.actions;
export default CartSlice.reducer;
