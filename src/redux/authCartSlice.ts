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
    },
  ];
  quantity: number;
  totalPrice: number;
  _id: string;
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
  ],
  message: '',
  statusAuth: EStatusAuth.check,
  quantity: 0,
  total: 0,
};
export const CartSlice = createSlice({
  name: 'cart',
  initialState: initValue,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingIndex = state.productId.findIndex(
        item => item._id === action.payload._id,
      );
      if (existingIndex >= 0) {
        state.productId[existingIndex] = {
          ...state.productId[existingIndex],
          quantity: state.productId[existingIndex].quantity + 1,
        };
      } else {
        let tempProductItem = {...action.payload, quantity: 1};
        state.productId.push(tempProductItem);
      }
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.productId.findIndex(
        item => item._id === action.payload.id,
      );
      if (state.productId[itemIndex].quantity > 1) {
        state.productId[itemIndex].quantity -= 1;
      } else if (state.productId[itemIndex].quantity === 1) {
        const nextCartItems = state.productId.filter(
          item => item._id !== action.payload.id,
        );

        state.productId = nextCartItems;
      }
    },
    removeFromCart: (state, action) => {
      state.productId.map(cartItem => {
        if (cartItem._id === action.payload.id) {
          const nextCartItems = state.productId.filter(item => {
            item._id !== cartItem._id;
          });
          state.productId = nextCartItems;
        }
        return state;
      });
    },
    updateStatusAuth: (
      state,
      action: PayloadAction<{statusAuth: EStatusAuth}>,
    ) => {
      state.statusAuth = action.payload.statusAuth;
    },

    getTotals(state, action) {
      let {total, quantity} = state.productId.reduce(
        (cartTotal, cartItem) => {
          const {discountPrice, quantity} = cartItem;
          const itemTotal = discountPrice * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      total = parseFloat(total.toFixed(2));
      state.quantity = quantity;
      state.total = total;
    },
    clearCart(state, action) {
      state.productId = [];
    },
  },
});
export const {
  addToCart,
  updateStatusAuth,
  clearCart,
  getTotals,
  removeFromCart,
  decreaseCart,
} = CartSlice.actions;
export default CartSlice.reducer;
