import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IProduct} from '../types/IProduct';

export interface IItemCart {
  cart: {
    _id: string;
    item: [
      {
        product_id: IProduct;
      },
    ];
  };
}

const initValue: IItemCart = {
  cart: {
    _id: '',
    item: [
      {
        product_id: {
          _id: '61b05332df535cdbd41aec55',
          name: 'Du Lịch Hang Sơn Đoòng',
          listedPrice: 15000000,
          discountPrice: 1000000,
          is_hot: true,
          listphotos: [],
          quantity: 100,
          sold: 0,
          vote: 5,
          tags: [],
          createdAt: '',
          updateAt: '',
          deletedAt:'',
          img: '',

          description: '',
          supplier: '',
        },
      },
    ],
  },
};


export const cartSlice = createSlice({
    name:'cart',
    initialState: initValue,
    reducers:{
        onGetCart:(state,action:PayloadAction<IItemCart>) =>{
            state.cart = action.payload.cart;
        }
    }
})
export const {onGetCart} = cartSlice.actions;
export default cartSlice.reducer
