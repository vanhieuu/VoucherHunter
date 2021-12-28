import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EStatusAuth} from './authSlice';

export interface INewsData {
  _id: string;
  title: string;
  creator: string;
  content: string;
  created_at: string;
  updated_at: string;
  image:string;
}
export interface INews {
  totalNews: number;
  totalPage: number;
  data: INewsData;
  success: boolean;
  page: number;
  statusAuth: EStatusAuth;
}

export enum IPageNumber {
  page = 1
}


const initValue: INews = {
  totalNews: 0,
  totalPage: 0,
  data: {
    _id: '',
    title: '',
    creator: '',
    content: '',
    created_at: '',
    updated_at: '',
    image:'',
  },
  success: false,
  page: 1,
  statusAuth: EStatusAuth.check,
};



export const newSlice = createSlice({
  name: 'news',
  initialState: initValue,
  reducers: {
    onGetNews: (state, action: PayloadAction<INews>) => {
      state.data = action.payload.data;
      state.page = action.payload.page;
      state.success = action.payload.success;
      state.totalNews = action.payload.totalNews;
      state.totalPage = action.payload.totalPage;
      state.success = action.payload.success;
      
    },
    onUpdatePageNumber: (
      state,
      action: PayloadAction<{page:IPageNumber}>,
    ) => {
      state.page = action.payload.page;
    },
  },
});
export const {onGetNews,onUpdatePageNumber} = newSlice.actions;
export default newSlice.reducer;
