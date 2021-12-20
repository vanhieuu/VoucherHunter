import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
  quantity: 0,
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
        item => item.product_id._id === action.payload._id,
      );
      console.log(itemIndex);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
        state.numberCart++;
      } else {
        const tempProduct = {...action.payload, quantity: 1};
        state.items.push(tempProduct);
        console.log(tempProduct);
        state.numberCart++;
      }
      AsyncStorage.setItem('CartItems', JSON.stringify(state.items));
    },
    onIncreaseQuantity: (state, action) => {
      
      const itemIndex = state.items.findIndex(
        item => item.product_id._id = action.payload._id,
      );
      // console.log(itemIndex)
      state.items[itemIndex].quantity += 1;
      state.numberCart++;
      
    },
    onDecreaseQuantity: (state, action) => {
      
      const itemIndex = state.items.findIndex(
        item => item.product_id._id === action.payload._id,
        
      );
      const nextCartItem = state.items.filter(
        item => item.product_id._id !== action.payload._id,
      );
      
      console.log(itemIndex);
      if (state.quantity > 1) {
        state.quantity -= 1;
        state.numberCart--;
      } else if (state.quantity === 1) {
        state.quantity = 0; 
        // state.items = nextCartItem
        // state.items. = nextItems
        state.numberCart--;
      }
    },
    onGetCartNumber: (state, action) => {
      state.numberCart = action.payload.numberCart;
    },
    removeFromCar: (state, action: PayloadAction<IProduct>) => {
      const nextCartItem = state.items.filter(
        item => item.product_id._id !== action.payload._id,
      );
      console.log(nextCartItem);
    },
  },
});

export const saveCartAsync = (Cart: IAuth) => {
  try {
    AsyncStorage.setItem('CartItems', JSON.stringify(Cart.items));
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

export const {
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onGetCartNumber,
} = CartSlice.actions;
export default CartSlice.reducer;
