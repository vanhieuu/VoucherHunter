export interface IItems {
  updateAt: string;
  _id: string;
  name: string;
  listedPrice: number;
  discountPrice: number;
  is_hot: boolean;
  in_slider: boolean;
  listphotos: [];
  quantity: number;
  tags: [];
  createdAt: string;
  __v: number;
}
export interface IResItem{
    success:boolean;
    message:string;
    item:IItems;
}