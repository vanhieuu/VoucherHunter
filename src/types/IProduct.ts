import { INewsData } from "../redux/newSlice";

export interface IShortItem {
    name:string,
    price:string,
    type:string,
}

export interface IProduct {
  _id: string;
  name: string;
  listedPrice:number;
  discountPrice:number;
  is_hot:boolean;
  listphotos:[];
  createdAt: string;
  updateAt: string;
  deletedAt: string;
  quantity:number;
  img:string;
  tags: [];
  description:string
  sold:number;
  vote:number;
  supplier:string;
  in_slider:boolean;
  
}
export interface IResNews {
  success:boolean;
  message:string;
  data:INewsData[]
}
export interface IResProduct{
  data:IProduct[]
}