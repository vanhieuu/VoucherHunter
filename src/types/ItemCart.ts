import {IProduct} from './IProduct';

export interface IItemCart {
  cart: {
    _id: string;
    items: [
      {
        product_id: IProduct;
        quantity: number,
        _id:string,
        totalPrice:number
      },
     
    ];
  };
}
export interface IResCart {
  product_id: IProduct;
}
